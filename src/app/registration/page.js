import RegisterHero from '@/components/Register/RegisterHero'
import Squares from "@/components/Squares/Squares";
import MultiStepForm from '@/components/Register/MultiStepForm';
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
          <MultiStepForm />
        </div>
      </div>
    </main>
  )
}
