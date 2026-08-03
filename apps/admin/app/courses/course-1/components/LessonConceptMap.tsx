"use client";

import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  MarkerType,
  Handle,
  Position,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ─── Custom Node Types ─────────────────────────────── */

function ConceptCardNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-[160px] rounded-2xl border-2 shadow-md bg-white transition-all ${
        selected ? "border-blue-500 shadow-blue-200" : "border-blue-200"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-400 !w-3 !h-3" />
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
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400 !w-3 !h-3" />
    </div>
  );
}

function ExampleSentenceNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-[220px] max-w-[320px] rounded-2xl border-2 shadow-md bg-amber-50 transition-all ${
        selected ? "border-amber-500 shadow-amber-200" : "border-amber-200"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-amber-400 !w-3 !h-3" />
      <div className="px-4 py-2 border-b border-amber-200 bg-amber-100 rounded-t-xl">
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Example Sentence</span>
      </div>
      <div className="px-4 py-3 space-y-1">
        <p className="font-arabic text-lg font-bold text-slate-900 text-right leading-loose dir-rtl" dir="rtl">
          {(data as any).arabic || "مِثَالٌ عَرَبِيٌّ"}
        </p>
        <p className="text-[11px] text-amber-800 italic">{(data as any).english || "English translation"}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-amber-400 !w-3 !h-3" />
    </div>
  );
}

function RuleBoxNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`min-w-[180px] max-w-[280px] rounded-2xl border-2 shadow-md bg-emerald-50 transition-all ${
        selected ? "border-emerald-500 shadow-emerald-200" : "border-emerald-200"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-emerald-500 !w-3 !h-3" />
      <div className="px-4 py-2 border-b border-emerald-200 bg-emerald-100 rounded-t-xl">
        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Grammar Rule</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-bold text-emerald-900 leading-relaxed">
          {(data as any).rule || "Grammar rule explanation goes here."}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-500 !w-3 !h-3" />
    </div>
  );
}

const nodeTypes = {
  conceptCard: ConceptCardNode,
  exampleSentence: ExampleSentenceNode,
  ruleBox: RuleBoxNode,
};

/* ─── Default Canvas State ──────────────────────────── */

const initialNodes: Node[] = [
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
    position: { x: 160, y: 260 },
    data: { arabic: "الْعِلْمُ نُورٌ", english: "Knowledge is light." },
  },
  {
    id: "n4",
    type: "ruleBox",
    position: { x: 60, y: 440 },
    data: { rule: "Both Mubtada' and Khabar must be Marfoo' (nominative case). Tanween Dammah (ٌ) on Khabar." },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "n1",
    target: "n2",
    label: "paired with",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#94A3B8" },
    labelStyle: { fontSize: 10, fontWeight: 700, fill: "#64748B" },
    labelBgStyle: { fill: "#F8FAF6", opacity: 0.9 },
  },
  {
    id: "e3-4",
    source: "n3",
    target: "n4",
    label: "demonstrates",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#94A3B8" },
    labelStyle: { fontSize: 10, fontWeight: 700, fill: "#64748B" },
    labelBgStyle: { fill: "#F8FAF6", opacity: 0.9 },
  },
];

/* ─── Props & Component ─────────────────────────────── */

interface LessonConceptMapProps {
  initialData?: { nodes: Node[]; edges: Edge[] };
  onChange?: (nodes: Node[], edges: Edge[]) => void;
}

let nodeCounter = 10;

export default function LessonConceptMap({ initialData, onChange }: LessonConceptMapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData?.nodes ?? initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData?.edges ?? initialEdges);

  const [addType, setAddType] = useState<"conceptCard" | "exampleSentence" | "ruleBox">("conceptCard");

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
            label: "→",
            style: { stroke: "#94A3B8" },
            labelStyle: { fontSize: 10, fontWeight: 700, fill: "#64748B" },
            labelBgStyle: { fill: "#F8FAF6", opacity: 0.9 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const handleAddNode = () => {
    nodeCounter++;
    const newNode: Node = {
      id: `n-${nodeCounter}`,
      type: addType,
      position: { x: 100 + Math.random() * 300, y: 80 + Math.random() * 200 },
      data:
        addType === "conceptCard"
          ? { label: "New Concept", arabic: "مَفْهُومٌ جَدِيدٌ", english: "New term" }
          : addType === "exampleSentence"
          ? { arabic: "مِثَالٌ جَدِيدٌ", english: "New example sentence" }
          : { rule: "New grammar rule explanation." },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Add Node:</span>
        <div className="flex items-center gap-2">
          {(["conceptCard", "exampleSentence", "ruleBox"] as const).map((type) => {
            const labels = {
              conceptCard: { label: "Concept Card", color: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200" },
              exampleSentence: { label: "Example Sentence", color: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200" },
              ruleBox: { label: "Rule Box", color: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200" },
            };
            return (
              <button
                key={type}
                onClick={() => { setAddType(type); handleAddNode(); }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${labels[type].color}`}
              >
                + {labels[type].label}
              </button>
            );
          })}
        </div>
        <span className="text-[10px] text-slate-400 ml-auto">Drag nodes · Connect handles · Double-click to rename</span>
      </div>

      {/* Canvas */}
      <div className="flex-1 rounded-2xl border border-slate-200 overflow-hidden" style={{ height: 480 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background color="#E2E8F0" gap={20} size={1} />
          <Controls className="!border-slate-200 !shadow-sm !rounded-xl" />
          <MiniMap
            nodeColor={(n) =>
              n.type === "conceptCard" ? "#BFDBFE" : n.type === "exampleSentence" ? "#FDE68A" : "#6EE7B7"
            }
            className="!rounded-xl !border-slate-200"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
