import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function FilterTabs({ filter, setFilter }) {
  const handleChange = (key) => {
    setFilter(key);
  };

  const tabItems = [
    { key: "all", tab: "All" },
    { key: "active", tab: "Active" },
    { key: "completed", tab: "Completed" },
  ];

  return (
    <Tabs activeKey={filter} onChange={handleChange}>
      {tabItems.map((item) => (
        <TabPane key={item.key} tab={item.tab}>
        </TabPane>
      ))}
    </Tabs>
  );
}

export default FilterTabs;
