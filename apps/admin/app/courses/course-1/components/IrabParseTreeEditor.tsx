"use client";

import React, { useState } from "react";
import Tree from "react-d3-tree";

/* ─── Types ─────────────────────────────────────────── */

interface TreeNode {
  name: string;        // Arabic label
  nameEn?: string;     // English label
  role?: string;       // e.g. "مُبْتَدَأٌ" / "SUBJECT"
  attributes?: Record<string, string>;
  children?: TreeNode[];
}

/* ─── Default Tree ───────────────────────────────────── */

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

/* ─── Custom Node Renderer ───────────────────────────── */

const ROLE_COLORS: Record<string, string> = {
  ROOT: "#0F172A",
  "مُبْتَدَأٌ": "#2563EB",
  "خَبَرٌ": "#D97706",
  "فَاعِلٌ": "#16A34A",
  "مَفْعُولٌ بِهِ": "#9333EA",
  "مُضَافٌ": "#DC2626",
  "مُضَافٌ إِلَيْهِ": "#0891B2",
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
          // @ts-ignore – border color via inline for dynamic color
          // eslint-disable-next-line react/no-unknown-property
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
          {nodeDatum.attributes && Object.keys(nodeDatum.attributes).length > 0 && (
            <div className="mt-1 space-y-0.5">
              {Object.entries(nodeDatum.attributes).map(([k, v]) => (
                <p key={k} className="text-[9px] text-slate-500">
                  <span className="font-bold">{k}:</span> {v as string}
                </p>
              ))}
            </div>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

/* ─── Add Node Form ──────────────────────────────────── */

const ROLE_OPTIONS = [
  "مُبْتَدَأٌ", "خَبَرٌ", "فَاعِلٌ", "مَفْعُولٌ بِهِ", "مُضَافٌ", "مُضَافٌ إِلَيْهِ",
  "نَعْتٌ", "حَالٌ", "ظَرْفٌ", "ROOT",
];

/* ─── Component ──────────────────────────────────────── */

interface IrabParseTreeEditorProps {
  initialTree?: TreeNode;
  onChange?: (tree: TreeNode) => void;
}

export default function IrabParseTreeEditor({ initialTree, onChange }: IrabParseTreeEditorProps) {
  const [treeData, setTreeData] = useState<TreeNode>(initialTree ?? DEFAULT_TREE);
  const [newAr, setNewAr] = useState("");
  const [newEn, setNewEn] = useState("");
  const [newRole, setNewRole] = useState(ROLE_OPTIONS[0]);
  const [newCase, setNewCase] = useState("مَرْفُوعٌ");
  const [newEnding, setNewEnding] = useState("ـُ Damma");
  const [parentPath, setParentPath] = useState("ROOT");

  const handleAddNode = () => {
    if (!newAr.trim()) return;
    const newNode: TreeNode = {
      name: newAr.trim(),
      nameEn: newEn.trim() || undefined,
      role: newRole,
      attributes: { Case: newCase, Ending: newEnding },
      children: [],
    };

    const addToTree = (node: TreeNode, targetName: string): TreeNode => {
      if (node.name === targetName || (targetName === "ROOT" && node.role === "ROOT")) {
        return { ...node, children: [...(node.children || []), newNode] };
      }
      return {
        ...node,
        children: node.children?.map((c) => addToTree(c, targetName)),
      };
    };

    const updated = addToTree(treeData, parentPath);
    setTreeData(updated);
    onChange?.(updated);
    setNewAr("");
    setNewEn("");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Add Node Panel */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Arabic Word *</label>
          <input
            value={newAr}
            onChange={(e) => setNewAr(e.target.value)}
            className="w-full font-arabic text-base font-bold p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 text-right"
            dir="rtl"
            placeholder="الْكَلِمَةُ"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">English Label</label>
          <input
            value={newEn}
            onChange={(e) => setNewEn(e.target.value)}
            className="w-full text-sm p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400"
            placeholder="e.g. the word"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Grammatical Role</label>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 font-arabic"
          >
            {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Case (I'rab)</label>
          <select
            value={newCase}
            onChange={(e) => setNewCase(e.target.value)}
            className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400"
          >
            {["مَرْفُوعٌ", "مَنْصُوبٌ", "مَجْرُورٌ", "مَبْنِيٌّ"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Case Ending</label>
          <input
            value={newEnding}
            onChange={(e) => setNewEnding(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400"
            placeholder="e.g. ـُ Damma"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Attach to (Parent Name)</label>
          <input
            value={parentPath}
            onChange={(e) => setParentPath(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400"
            placeholder="ROOT or parent word"
          />
        </div>
        <div className="col-span-2 md:col-span-3">
          <button
            onClick={handleAddNode}
            className="px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors"
          >
            + Add Node to Tree
          </button>
        </div>
      </div>

      {/* Tree Visualization */}
      <div
        className="rounded-2xl border border-slate-200 bg-[#F8FAF6] overflow-hidden"
        style={{ height: 420 }}
      >
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
    </div>
  );
}
