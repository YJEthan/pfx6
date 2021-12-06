import React, { useEffect, useState } from "react";
import { message } from "antd";
import PF from "../..//Graph/Canvas";
import { exportJSON } from "../..//Utils/pfUtils";
import { Menu, Toolbar } from "@antv/x6-react-components";
import "@antv/x6-react-components/es/menu/style/index.css";
import "@antv/x6-react-components/es/toolbar/style/index.css";
import "antd/dist/antd.css";

import {
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  SaveFilled
} from "@ant-design/icons";
const Item = Toolbar.Item; // eslint-disable-line
const Group = Toolbar.Group; // eslint-disable-line

// export default class extends React.Component {
export default function () {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const { graph } = PF;
    // history
    const { history } = graph;
    setCanUndo(history.canUndo());
    setCanRedo(history.canRedo());
    history.on("change", () => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    // zoom
    setZoom(graph.zoom());
    graph.on("scale", () => {
      setZoom(graph.zoom());
    });
  }, []);
  // componentDidMount() {
  //   this.setState({
  //     canRedo: PF.graph.history.canRedo(),
  //     canUndo: PF.graph.history.canUndo()
  //   });
  // }
  handleClick = (name: string) => {
    console.log(name);
    const { graph } = PF;
    switch (name) {
      case "undo":
        graph.history.undo();
        break;
      case "redo":
        graph.history.redo();
        break;
      case "delete":
        graph.removeCells(graph.getSelectedCells());
        break;
      case "save":
        exportJSON(graph);
        break;
      case "zoomIn":
        graph.zoom(0.1);
        break;
      case "zoomOut":
        graph.zoom(-0.1);
        break;
      case "resetView":
        graph.zoomTo(1);
        break;
      default:
        graph.zoomTo(parseInt(name, 10) * 0.01);
        break;
    }
  };
  renderZoomDropdown = () => {
    const MenuItem = Menu.Item; // eslint-disable-line
    const Divider = Menu.Divider; // eslint-disable-line

    return (
      <Menu>
        <MenuItem name="resetView" hotkey="Cmd+H">
          Reset View
        </MenuItem>
        {/* <MenuItem name="fitWindow" hotkey="Cmd+Shift+H">
          Fit Window
        </MenuItem>
        <Divider /> */}
        <MenuItem name="50">50%</MenuItem>
        <MenuItem name="75">75%</MenuItem>
        <MenuItem name="100">100%</MenuItem>
        <MenuItem name="125">125%</MenuItem>
        <MenuItem name="150">150%</MenuItem>
        <MenuItem name="175">175%</MenuItem>
        <MenuItem name="200">200%</MenuItem>
      </Menu>
    );
  };

  return (
    <div style={{ padding: 0 }}>
      <div style={{ background: "#f5f5f5", paddingRight: 0 }}>
        <Toolbar
          hoverEffect={true}
          size="big"
          onClick={this.handleClick}
          extra={<span>Extra Component</span>}
        >
          <Group>
            <Item
              name="zoom"
              tooltipAsTitle={true}
              tooltip="Zoom (Alt+Mousewheel)"
              dropdown={this.renderZoomDropdown()}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 40,
                  textAlign: "right"
                }}
              >
                {`${(zoom * 100).toFixed(0)}%`}
              </span>
            </Item>
          </Group>
          <Group>
            <Item
              name="zoomIn"
              tooltip="Zoom In (Cmd +)"
              icon={<ZoomInOutlined />}
              disabled={zoom > 2}
            />
            <Item
              name="zoomOut"
              tooltip="Zoom Out (Cmd -)"
              icon={<ZoomOutOutlined />}
              disabled={zoom < 0.5}
            />
          </Group>
          <Group>
            <Item name="save" tooltip="save" icon={<SaveFilled />} />
          </Group>
          <Group>
            <Item
              name="undo"
              tooltip="Undo (Cmd + Z)"
              disabled={!canUndo}
              icon={<UndoOutlined />}
            />
            <Item
              name="redo"
              tooltip="Redo (Cmd + Shift + Z)"
              disabled={!canRedo}
              icon={<RedoOutlined />}
            />
          </Group>
          <Group>
            <Item
              name="delete"
              icon={<DeleteOutlined />}
              disabled={false}
              tooltip="Delete (Delete)"
            />
          </Group>
          {/* <Group>
              <Item
                name="bold"
                icon={<BoldOutlined />}
                active={true}
                tooltip="Bold (Cmd + B)"
              />
              <Item
                name="italic"
                icon={<ItalicOutlined />}
                tooltip="Italic (Cmd + I)"
              />
              <Item
                name="strikethrough"
                icon={<StrikethroughOutlined />}
                tooltip="Strikethrough (Cmd + Shift + x)"
              />
              <Item
                name="underline"
                icon={<UnderlineOutlined />}
                tooltip="Underline (Cmd + U)"
              /> */}
          {/* </Group> */}
        </Toolbar>
      </div>
    </div>
  );
}
