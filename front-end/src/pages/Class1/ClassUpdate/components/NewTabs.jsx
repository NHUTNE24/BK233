import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import ItemOne from "../itemOne";

function NewTabs() {
  return (
    <Tabs type="card" defaultActiveKey="1">
      <TabPane tab="Training Program" key="1">
        <ItemOne/>
      </TabPane>
      <TabPane tab="Attendee List" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Budget" key="3">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Others" key="4">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  )
}

export default NewTabs;