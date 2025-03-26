import Sidebar from "@/components/Sidebar";
import VoiceComponent from "@/components/VoiceComponent";
export default function page() {
    return (

        <>
            <div className="flex min-h-screen bg-zinc-200">

                <Sidebar />


                <main className="flex-1 p-6" >
                <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute -z-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/100 to-blue-500/100 blur-[100px] animate-pulse" />

                    <small className="text-sm text-gray-500">Powered by PrepGen</small>
                    <h1 className="text-4xl font-bold mb-6">Realtime Voice Agent</h1>
                    <VoiceComponent />
                    <small className="text-xs text-gray-500 my-6">
                        The app requires microphone access to work.
                    </small>
                </main>
                </main>
            </div>
        </>
    );
}
