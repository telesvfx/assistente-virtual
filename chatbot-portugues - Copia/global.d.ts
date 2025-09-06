// Arquivo: global.d.ts
declare module 'mic-recorder-to-mp3' {
class MicRecorder {
    constructor(options: any);
    start(): Promise<void>;
    stop(): {
    getMp3(): Promise<[Buffer, Blob]>;
    };
}
export default MicRecorder;
}