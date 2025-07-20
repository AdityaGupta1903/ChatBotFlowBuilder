import { useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaWhatsapp } from "react-icons/fa";
import MessageDrawerComponent from "../Drawers/EditDrawer";

export function SendMessage(props: any) {
    const [openEditDrawer, setOpenEditDrawer] = useState(false);

    const onChange = (e: any) => {
        let Id = Number(props.id.split("-")[1]);
        props.data.UpdateNodeData(Id, e)
    }

    return (
        <div className="flex flex-col items-center">
            <div onClick={() => {
                setOpenEditDrawer(true)
            }} className="relative w-64 rounded-xl shadow-md border border-gray-300 bg-white">
                <div className="flex items-center justify-between bg-teal-200 rounded-t-xl px-3 py-2">
                    <span className="text-sm font-semibold text-gray-800">Send Message</span>
                    <FaWhatsapp className="text-green-600" />
                </div>

                <div className="p-3 text-sm text-gray-700">
                    {props.data.label}
                </div>

                <Handle
                    type="target"
                    position={Position.Left}
                    className="!top-1/2 !-translate-y-1/2 w-3 h-3 bg-blue-500 border-none rounded-full"
                />

                <Handle
                    type="source"
                    position={Position.Right}
                    className="!top-1/2 !-translate-y-1/2 w-3 h-3 bg-green-500 border-none rounded-full"
                />
            </div>
            <MessageDrawerComponent open={openEditDrawer} message={props.data.label} onChange={onChange} setOpen={setOpenEditDrawer} />
        </div>
    );
}
