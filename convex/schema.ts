import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("todo"), v.literal("in-progress"), v.literal("done")),
    assignee: v.union(v.literal("me"), v.literal("agent")),
    createdAt: v.number(),
    updatedAt: v.number(),
    dueDate: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_assignee", ["assignee"]),

  contentItems: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    script: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    stage: v.union(
      v.literal("ideas"),
      v.literal("script"),
      v.literal("thumbnail"),
      v.literal("filming"),
      v.literal("published")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_stage", ["stage"]),

  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    date: v.number(),
    type: v.union(v.literal("task"), v.literal("cron"), v.literal("event")),
    metadata: v.optional(v.record(v.string(), v.any())),
    createdAt: v.number(),
  })
    .index("by_date", ["date"]),

  memories: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
    agentId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_agent", ["agentId"]),

  agents: defineTable({
    name: v.string(),
    role: v.string(),
    avatar: v.optional(v.string()),
    status: v.union(v.literal("idle"), v.literal("working")),
    currentTask: v.optional(v.string()),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    createdAt: v.number(),
  }),
});
