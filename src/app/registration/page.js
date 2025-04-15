import RegisterHero from '@/components/Register/RegisterHero'
import Squares from "@/components/Squares/Squares";
import ClashSheetModal from '@/components/Register/ClashSheetModal';

export default function Register() {
  return (
    <main>
      <RegisterHero />
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <Squares
            squareSize={40}
            borderColor="#000"
          />
        </div>
        <div className="relative z-2">
          <ClashSheetModal />
          <div className="container mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Registration Has Ended</h2>
            <p className="text-xl">Thank you for your interest. The registration period for this event has now closed.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
