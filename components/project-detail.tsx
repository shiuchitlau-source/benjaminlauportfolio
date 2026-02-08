"use client";

import React from "react"

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";
import { VideoEmbed } from "@/components/video-embed";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-background">
      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 right-0 top-0 z-50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Projects
          </Link>
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            Benjamin Lau
          </span>
        </div>
      </motion.div>

      {/* Hero image or video */}
      <section className="px-6 pb-4 pt-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted md:aspect-[21/9]"
          >
            {project.detail.heroVideo ? (
              <VideoEmbed
                url={project.detail.heroVideo}
                hero
                title={project.title}
                className="object-cover"
              />
            ) : (
              <Image
                src={project.detail.heroImage || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Title + meta */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
            <div>
              <FadeIn>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  {project.type === "web" && (
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                      Web Design
                    </span>
                  )}
                </div>
                <h1 className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-7xl lg:text-8xl">
                  {project.title}
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {project.detail.overview}
                </p>
              </FadeIn>
            </div>

            {/* Sidebar meta */}
            <FadeIn delay={0.2} className="flex flex-col gap-8 lg:pt-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Client
                </p>
                <p className="mt-2 text-base font-medium text-foreground">
                  {project.detail.client}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Year
                </p>
                <p className="mt-2 text-base font-medium text-foreground">
                  {project.year}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Duration
                </p>
                <p className="mt-2 text-base font-medium text-foreground">
                  {project.detail.duration}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Role
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.detail.role.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="border-t border-border px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              The Challenge
            </span>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {project.detail.challenge}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              The Solution
            </span>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {project.detail.solution}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery (images + optional videos from content) */}
      <section className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2">
            {project.detail.gallery.map((img, i) => (
              <FadeIn key={`img-${i}-${img}`} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${project.title} gallery ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
            {project.detail.videos?.map((videoUrl, i) => (
              <FadeIn key={`video-${i}-${videoUrl}`} delay={(project.detail.gallery?.length ?? 0) * 0.1 + i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <VideoEmbed
                    url={videoUrl}
                    title={`${project.title} video ${i + 1}`}
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="mt-16 border-t border-border px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Next Project
            </p>
            <Link
              href={`/project/${nextProject.slug}`}
              className="group mt-4 flex items-end justify-between"
            >
              <h2 className="font-display text-4xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-6xl lg:text-7xl">
                {nextProject.title}
              </h2>
              <ArrowUpRight className="mb-2 h-8 w-8 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 md:h-12 md:w-12" />
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {nextProject.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {nextProject.year}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
