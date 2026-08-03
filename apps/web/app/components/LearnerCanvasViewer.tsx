"use client";

import React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  NodeProps,
  Handle,
  Position,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ─── Custom Read-Only Node Types for Learner ──────── */

function LearnerConceptCardNode({ data }: NodeProps) {
  return (
    <div className="min-w-[160px] rounded-2xl border-2 border-blue-200 shadow-md bg-white">
      <Handle type="target" position={Position.Top} className="!bg-blue-400 !w-2.5 !h-2.5" />
      <div className="bg-blue-50 px-4 py-2 rounded-t-xl border-b border-blue-100">
        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
          {(data as any).label || "Concept"}
        </span>
      </div>
      <div className="px-4 py-3 space-y-1">
        <p className="font-arabic text-xl font-bold text-slate-900 text-right dir-rtl" dir="rtl">
          {(data as any).arabic || "كَلِمَةٌ"}
        </p>
        <p className="text-xs text-slate-600 font-medium">{(data as any).english || "Term"}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400 !w-2.5 !h-2.5" />
    </div>
  );
}

function LearnerExampleSentenceNode({ data }: NodeProps) {
  return (
    <div className="min-w-[220px] max-w-[320px] rounded-2xl border-2 border-amber-200 shadow-md bg-amber-50">
      <Handle type="target" position={Position.Top} className="!bg-amber-400 !w-2.5 !h-2.5" />
      <div className="px-4 py-2 border-b border-amber-200 bg-amber-100 rounded-t-xl">
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Example Sentence</span>
      </div>
      <div className="px-4 py-3 space-y-1">
        <p className="font-arabic text-lg font-bold text-slate-900 text-right leading-loose dir-rtl" dir="rtl">
          {(data as any).arabic || "مِثَالٌ عَرَبِيٌّ"}
        </p>
        <p className="text-[11px] text-amber-800 italic">{(data as any).english || "English translation"}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-amber-400 !w-2.5 !h-2.5" />
    </div>
  );
}

function LearnerRuleBoxNode({ data }: NodeProps) {
  return (
    <div className="min-w-[180px] max-w-[280px] rounded-2xl border-2 border-emerald-200 shadow-md bg-emerald-50">
      <Handle type="target" position={Position.Top} className="!bg-emerald-500 !w-2.5 !h-2.5" />
      <div className="px-4 py-2 border-b border-emerald-200 bg-emerald-100 rounded-t-xl">
        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Grammar Rule</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-bold text-emerald-900 leading-relaxed">
          {(data as any).rule || "Grammar rule explanation."}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-500 !w-2.5 !h-2.5" />
    </div>
  );
}

const nodeTypes = {
  conceptCard: LearnerConceptCardNode,
  exampleSentence: LearnerExampleSentenceNode,
  ruleBox: LearnerRuleBoxNode,
};

/* ─── Default Sample Diagram for Lessons ─────────────── */

const DEFAULT_NODES: Node[] = [
  {
    id: "n1",
    type: "conceptCard",
    position: { x: 80, y: 60 },
    data: { label: "Subject", arabic: "الْمُبْتَدَأُ", english: "Mubtada' (Subject)" },
  },
  {
    id: "n2",
    type: "conceptCard",
    position: { x: 360, y: 60 },
    data: { label: "Predicate", arabic: "الْخَبَرُ", english: "Khabar (Predicate)" },
  },
  {
    id: "n3",
    type: "exampleSentence",
    position: { x: 160, y: 240 },
    data: { arabic: "الْعِلْمُ نُورٌ", english: "Knowledge is light in life." },
  },
  {
    id: "n4",
    type: "ruleBox",
    position: { x: 80, y: 400 },
    data: { rule: "Both Mubtada' and Khabar must be Marfoo' (nominative case). Tanween Dammah (ٌ) on Khabar." },
  },
];

const DEFAULT_EDGES: Edge[] = [
  {
    id: "e1-2",
    source: "n1",
    target: "n2",
    label: "paired with",
    style: { stroke: "#94A3B8" },
    labelStyle: { fontSize: 10, fontWeight: 700, fill: "#64748B" },
    labelBgStyle: { fill: "#F8FAF6", opacity: 0.9 },
  },
  {
    id: "e3-4",
    source: "n3",
    target: "n4",
    label: "demonstrates",
    style: { stroke: "#94A3B8" },
    labelStyle: { fontSize: 10, fontWeight: 700, fill: "#64748B" },
    labelBgStyle: { fill: "#F8FAF6", opacity: 0.9 },
  },
];

interface LearnerCanvasViewerProps {
  canvasData?: { nodes?: Node[]; edges?: Edge[] };
}

export default function LearnerCanvasViewer({ canvasData }: LearnerCanvasViewerProps) {
  const nodes = canvasData?.nodes && canvasData.nodes.length > 0 ? canvasData.nodes : DEFAULT_NODES;
  const edges = canvasData?.edges && canvasData.edges.length > 0 ? canvasData.edges : DEFAULT_EDGES;

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F8FAF6]" style={{ height: 480 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#CBD5E1" gap={20} size={1} />
        <Controls className="!border-slate-200 !shadow-xs !rounded-xl" />
        <MiniMap
          nodeColor={(n) =>
            n.type === "conceptCard" ? "#BFDBFE" : n.type === "exampleSentence" ? "#FDE68A" : "#6EE7B7"
          }
          className="!rounded-xl !border-slate-200"
        />
      </ReactFlow>
    </div>
  );
}
