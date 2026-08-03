"use client";

import React, { useState } from "react";
import Tree from "react-d3-tree";

interface TreeNode {
  name: string;
  nameEn?: string;
  role?: string;
  attributes?: Record<string, string>;
  children?: TreeNode[];
}

const DEFAULT_TREE: TreeNode = {
  name: "الْجُمْلَةُ",
  nameEn: "Sentence",
  role: "ROOT",
  children: [
    {
      name: "الْعِلْمُ",
      nameEn: "Al-'Ilm",
      role: "مُبْتَدَأٌ",
      attributes: { "Case": "مَرْفُوعٌ", "Ending": "ـُ Damma" },
    },
    {
      name: "نُورٌ",
      nameEn: "Noor",
      role: "خَبَرٌ",
      attributes: { "Case": "مَرْفُوعٌ", "Ending": "ـٌ Tanween" },
    },
  ],
};

const ROLE_COLORS: Record<string, string> = {
  ROOT: "#0F172A",
  "مُبْتَدَأٌ": "#2563EB",
  "خَبَرٌ": "#D97706",
  "فَاعِلٌ": "#16A34A",
  "مَفْعُولٌ بِهِ": "#9333EA",
  DEFAULT: "#64748B",
};

function renderCustomNode({ nodeDatum }: { nodeDatum: any }) {
  const color = ROLE_COLORS[nodeDatum.role] || ROLE_COLORS.DEFAULT;
  const isRoot = nodeDatum.role === "ROOT";

  return (
    <g>
      <foreignObject x={-90} y={-52} width={180} height={104}>
        <div
          style={{ fontFamily: "inherit" }}
          className={`rounded-xl border-2 shadow-sm text-center px-2 py-2 bg-white ${isRoot ? "border-slate-400" : ""}`}
          data-bordercolor={color}
        >
          <style>{`[data-bordercolor="${color}"] { border-color: ${color}; }`}</style>
          {nodeDatum.role && !isRoot && (
            <span
              className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full mb-1 inline-block font-arabic"
              style={{ backgroundColor: color + "18", color }}
            >
              {nodeDatum.role}
            </span>
          )}
          <p className="font-arabic text-base font-bold text-slate-900" dir="rtl">
            {nodeDatum.name}
          </p>
          {nodeDatum.nameEn && (
            <p className="text-[10px] text-slate-500 font-medium">{nodeDatum.nameEn}</p>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

interface IrabParseTreeEditorProps {
  initialTree?: TreeNode;
}

export default function IrabParseTreeEditor({ initialTree }: IrabParseTreeEditorProps) {
  const [treeData] = useState<TreeNode>(initialTree ?? DEFAULT_TREE);

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#F8FAF6] overflow-hidden" style={{ height: 380 }}>
      <Tree
        data={treeData as any}
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode as any}
        pathFunc="step"
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        nodeSize={{ x: 200, y: 140 }}
        translate={{ x: 300, y: 80 }}
        pathClassFunc={() => "!stroke-slate-300 !stroke-2"}
      />
    </div>
  );
}
