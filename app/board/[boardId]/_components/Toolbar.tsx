import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";
import ToolButoon from "./ToolButoon";


interface ToolbarProps{
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}
const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
}:ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
        <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
            <ToolButoon
                label="Select"
                icon={MousePointer2}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.None
                })}
                isActive={
                    canvasState.mode === CanvasMode.None || 
                    canvasState.mode === CanvasMode.Translating || 
                    canvasState.mode === CanvasMode.SelectionNet || 
                    canvasState.mode === CanvasMode.Pressing || 
                    canvasState.mode === CanvasMode.Resizing 
                }
            />
            <ToolButoon
                label="Text"
                icon={Type}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Text
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting && 
                    canvasState.layerType === LayerType.Text
                }
            />
            <ToolButoon
                label="Pen"
                icon={Pencil}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Pencil
                })}
                isActive={
                    canvasState.mode === CanvasMode.Pencil
                }
            />
            <ToolButoon
                label="Sticky note"
                icon={StickyNote}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Note
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting && 
                    canvasState.layerType === LayerType.Note
                }
            />
            <ToolButoon
                label="Rectangle"
                icon={Square}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Rectangle
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting && 
                    canvasState.layerType === LayerType.Rectangle
                }
            />
            <ToolButoon
                label="Ellipse"
                icon={Circle}
                onClick={()=>setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Ellipse
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting && 
                    canvasState.layerType === LayerType.Ellipse
                }
            />            

        </div>

        <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
            <ToolButoon
                label="Undo"
                icon={Undo2}
                onClick={undo}
                isDisabled={!canUndo}
            />   
            <ToolButoon
                label="Redo"
                icon={Redo2}
                onClick={redo}
                isDisabled={!canRedo}
            />   
        </div>
    </div>
  )
}

export function ToolbarSkeleton(){
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white shadow-md rounded-md h-[360px] w-[52px]" />
    )
}
export default Toolbar