import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { useLocation } from "react-router-dom";
import { BsSlashLg, BsBorderWidth } from "react-icons/bs";
import { RiPaletteLine, RiPaintFill } from "react-icons/ri";
import { BiCircle, BiRectangle, BiText, BiPencil, BiBrushAlt, BiUndo, BiRedo, BiCrop, BiTrashAlt } from "react-icons/bi";
import apiClient from "../../axios";

const addBackground = (editor, fabric, card) => {
  fabric.Image.fromURL(
    'http://127.0.0.1:5000/api/uploads/' + card.image,
    (image) => {
      editor.canvas.setBackgroundImage(
        image,
        editor.canvas.renderAll.bind(editor.canvas),
        {
          scaleX: editor.canvas.width / image.width,
          scaleY: editor.canvas.height / image.height
        }
      );
    }
  );
};

export default function App() {
  const { editor, onReady } = useFabricJSEditor();
  const [history, setHistory] = useState([]);
  const [color, setColor] = useState("#000000");
  const [fill, setFill] = useState("#000000");
  const [cropImage, setCropImage] = useState(true);
  const [draw, setDraw] = useState(false);
  const [numberOfObjects, setNumberOfObjects] = useState(0);

  const [card, setCard] = useState({});
  const location = useLocation()
  const cardId = location.state?.cardId;

  useEffect(() => {
    if (cardId) {
      apiClient.get(`card/${cardId}`).then(res => {
        setCard(res.data)
      }).catch(err => {
        console.error(err)
      })
    }
  }, [])

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(400);
    editor.canvas.setWidth(300);
    if (card.image) {
      addBackground(editor, fabric, card);
    }
    editor.canvas.renderAll();
  }, [card]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const toggleDraw = () => {
    setDraw(!draw)
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
  };

  const updateHistory = (action) => {
    if (action === "undo" && editor.canvas._objects.length > 0) {
      const updatedHistory = [...history];
      updatedHistory.push(editor.canvas._objects.pop());
      setHistory(updatedHistory);
    }
    if (action === "redo" && history.length > 0) {
      const updatedHistory = [...history];
      editor.canvas.add(updatedHistory.pop());
      setHistory(updatedHistory);
    }
    editor.canvas.renderAll();
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    const handleObjectAdded = () => {
      setNumberOfObjects(editor.canvas._objects.length)
    };
    editor.canvas.on("object:added", handleObjectAdded);
    return () => {
      editor.canvas.off("object:added", handleObjectAdded);
    };
  }, [editor, fabric]);

  const handleStrokeSize = (val) => {
    editor.canvas.freeDrawingBrush.width = val;
  }

  const onCropBackground = () => {
    setCropImage(!cropImage)
  }

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    setHistory([])
    setNumberOfObjects(0)
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const onFill = (e) => {
    setFill(e.target.value)
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type !== "group") {
      activeObject.set("fill", e.target.value);
      editor.canvas.renderAll();
    }
  }

  const onColor = (e) => {
    setColor(e.target.value)
    const activeObject = editor.canvas.getActiveObject();
    if (activeObject && activeObject.type !== "group") {
      activeObject.set("stroke", e.target.value);
      editor.canvas.renderAll();
    }
  }

  if (!card) {
    return <>loading</>
  } else {
    return (
      <div className="min-h-[80dvh] bg-gray-300 dark:bg-zinc-800 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          <div className="grid grid-cols-3 gap-4 py-5 px-10">
            <h1 className="text-2xl col-span-full">Edit Canvas</h1>
            <button
              onClick={() => editor.addCircle()}
              disabled={!cropImage || draw}
              className={`flex flex-col justify-center items-center ${(!cropImage || draw) && 'text-gray-500'}`}
            >
              <BiCircle className="text-2xl" />
              <span className="text-sm">Circle</span>
            </button>
            <button
              onClick={() => editor.addRectangle()}
              disabled={!cropImage || draw}
              className={`flex flex-col justify-center items-center ${(!cropImage || draw) && 'text-gray-500'}`}
            >
              <BiRectangle className="text-2xl" />
              <span className="text-sm">Rectangle</span>
            </button>
            <button
              onClick={() => editor.addLine()}
              disabled={!cropImage || draw}
              className={`flex flex-col justify-center items-center ${(!cropImage || draw) && 'text-gray-500'}`}
            >
              <BsSlashLg className="text-2xl" />
              <span className="text-sm">Line</span>
            </button>
            <button
              onClick={() => editor.addText("Enter Text Here")}
              disabled={!cropImage || draw}
              className={`flex flex-col justify-center items-center ${(!cropImage || draw) && 'text-gray-500'}`}
            >
              <BiText className="text-2xl" />
              <span className="text-sm">Text</span>
            </button>
            <button
              onClick={toggleDraw}
              disabled={!cropImage}
              className={`flex flex-col justify-center items-center ${(!cropImage) && 'text-gray-500'}`}
            >
              <BiPencil className="text-2xl" />
              <span className="text-sm">Draw</span>
            </button>
            <Tooltip
              placement="top"
              overlay={
                <input
                  type="range"
                  defaultValue={1}
                  onChange={(e) => handleStrokeSize(e.target.value)}
                  min={1}
                  max={15}
                />
              }
              trigger={['click']}
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
              <button
                disabled={!cropImage}
                className={`flex flex-col justify-center items-center ${(!cropImage) && 'text-gray-500'}`}
              >
                <BsBorderWidth className="text-2xl" />
                <span className="text-sm">Stroke</span>
              </button>
            </Tooltip>
            <button
              onClick={() => updateHistory('undo')}
              disabled={!cropImage || (numberOfObjects === history.length)}
              className={`flex flex-col justify-center items-center ${(!cropImage || (numberOfObjects === history.length)) && 'text-gray-500'}`}
            >
              <BiUndo className="text-2xl" />
              <span className="text-sm">Undo</span>
            </button>
            <button
              onClick={() => updateHistory('redo')}
              disabled={!cropImage || history.length === 0}
              className={`flex flex-col justify-center items-center ${(!cropImage || history.length === 0) && 'text-gray-500'}`}
            >
              <BiRedo className="text-2xl" />
              <span className="text-sm">Redo</span>
            </button>
            <button
              onClick={removeSelectedObject}
              disabled={!cropImage}
              className={`flex flex-col justify-center items-center ${(!cropImage) && 'text-gray-500'}`}
            >
              <BiTrashAlt className="text-2xl" />
              <span className="text-sm">Delete</span>
            </button>
            <button
              onClick={clear}
              disabled={!cropImage}
              className={`flex flex-col justify-center items-center ${(!cropImage) && 'text-gray-500'}`}
            >
              <BiBrushAlt className="text-2xl" />
              <span className="text-sm">Clear</span>
            </button>
            <button
              onClick={() => onCropBackground()}
              className="flex flex-col justify-center items-center"
            >
              <BiCrop className="text-2xl" />
              <span className="text-sm">Crop</span>
            </button>
            <button
              disabled={!cropImage}
              className={`flex flex-col justify-center items-center ${(!cropImage) && 'text-gray-500'}`}
            >
              <label htmlFor="colorInput" className="flex flex-col justify-center items-center">
                <RiPaletteLine className="text-2xl cursor-pointer" />
                <input
                  id="colorInput"
                  disabled={!cropImage}
                  type="color"
                  value={cropImage ? color : '#666666'}
                  onChange={(e) => onColor(e)}
                  className="h-3 w-8 appearance-none border-none outline-none bg-transparent cursor-pointer"
                />
                <span className="text-sm">Colour</span>
              </label>
            </button>
            <button
              disabled={!cropImage}
              className={`flex flex-col justify-center items-center ${(!cropImage) && 'text-gray-500'}`}
            >
              <label htmlFor="fillInput" className="flex flex-col justify-center items-center">
                <RiPaintFill className="text-2xl cursor-pointer" />
                <input
                  id="fillInput"
                  disabled={!cropImage}
                  type="color"
                  value={cropImage ? fill : '#666666'}
                  onChange={(e) => onFill(e)}
                  className="h-3 w-8 appearance-none border-none outline-none bg-transparent cursor-pointer"
                />
                <span className="text-sm">Fill</span>
              </label>
            </button>
          </div>
          {
            cardId ?
              <div className="relative p-14 lg:p-10 h-full flex items-center justify-center lg:col-span-2">
                <FabricJSCanvas className="sample-canvas border-2 border-black" onReady={onReady} />
                <div className="absolute right-10 top-0">
                  <button type="submit" className='my-5 text-lg transition-all duration-500 shadow-lg px-5 py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l'>
                    Send Invite
                  </button>
                </div>
              </div>
              :
              <div className="text-3xl text-center">
                Card Not Found
              </div>
          }
        </div>
      </div>
    );
  }
}