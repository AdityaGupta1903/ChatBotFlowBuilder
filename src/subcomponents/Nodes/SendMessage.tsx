import { useCallback } from "react";
import { Handle } from '@xyflow/react';

export function SendMessage(props: any) {
    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <div className="text-updater-node">
                <div>
                    <label htmlFor="text">Text:</label>
                    <input id="text" name="text" onChange={onChange} className="nodrag" />
                </div>
            </div>
            <Handle type="source" position="right" />
            <Handle type="target" position="left" />
        </>
    );
}