export interface TaskResponse {
    message: string;
    taks: Tasks[];
}

export interface Tasks {
    id: number;
    user_id: number;
    title: string;
    description: string;
}