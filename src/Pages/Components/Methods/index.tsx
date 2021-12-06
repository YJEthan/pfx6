import PF from "../..//Graph/Canvas";
import { exportJSON } from "../..//Utils/pfUtils";
export default function (name: string) {
  const handleClick = (name: string) => {
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
        PF.cell.remove();
        break;
      case "save":
        exportJSON(PF.graph);
        break;
      case "zoomIn":
        graph.zoom(0.1);
        break;
      case "zoomOut":
        graph.zoom(-0.1);
        break;
      default:
        break;
    }
  };
  handleClick(name);
}
