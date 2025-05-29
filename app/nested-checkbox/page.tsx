"use client";
import React, { useState } from "react";

const CheckboxesData = [
  {
    id: 1,
    name: "Fruits",
    children: [
      { id: 2, name: "Apple" },
      { id: 3, name: "Banana" },
      {
        id: 4,
        name: "Citrus",
        children: [
          { id: 5, name: "Orange" },
          { id: 6, name: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Vegetables",
    children: [
      { id: 8, name: "Carrot" },
      { id: 9, name: "Broccoli" },
      {
        id: 10,
        name: "Capsicum",
        children: [
          { id: 11, name: "Green Capsicum" },
          { id: 12, name: "Red Capsicum" },
        ],
      },
    ],
  },
];

const Checkboxes = ({ data, checked, setChecked }: any) => {
  const handleChange = (isChecked: any, item: any) => {
    setChecked((prev: any) => {
      const newState = { ...prev };

      // Update the item itself
      newState[item.id] = isChecked;

      // Recursively update all children
      const updateChildren = (item: any) => {
        item.children?.forEach((child: any) => {
          newState[child.id] = isChecked;
          if (child.children) updateChildren(child);
        });
      };
      updateChildren(item);

      // Recursively update all parent items
      const updateParents = (targetItem: any, root: any) => {
        const findParent: any = (id: any, nodes: any) => {
          for (const node of nodes) {
            if (node.children?.some((child: any) => child.id === id)) {
              return node;
            }
            const found = node.children ? findParent(id, node.children) : null;
            if (found) return found;
          }
          return null;
        };

        let parent = findParent(targetItem.id, root);
        while (parent) {
          const allChildrenChecked = parent.children.every(
            (child: any) => newState[child.id]
          );
          newState[parent.id] = allChildrenChecked;
          parent = findParent(parent.id, root);
        }
      };
      updateParents(item, CheckboxesData);

      return newState;
    });
  };

  return (
    <div>
      {data?.map((item: any) => (
        <div key={item.id} className="pl-5">
          <input
            type="checkbox"
            checked={!!checked[item?.id]}
            onChange={(e) => handleChange(e.target.checked, item)}
          />
          <span>{item.name}</span>
          {item?.children && (
            <Checkboxes
              data={item?.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Problem = () => {
  const [checked, setChecked] = useState({});

  return (
    <div className="w-full h-screen p-5">
      <h1 className="text-lg italic font-medium">Check Box Problem :</h1>
      <Checkboxes
        data={CheckboxesData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export default Problem;
