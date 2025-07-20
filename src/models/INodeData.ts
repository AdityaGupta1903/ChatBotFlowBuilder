export interface INodeData {
    id: string;
    position: {
        x: number;
        y: number;
    };
    type?: string,
    data: {
        label: string;
        UpdateNodeData: (Id: number, label: string) => void;
    };
}