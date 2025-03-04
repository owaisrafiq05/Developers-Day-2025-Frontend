import RegisterHero from '@/components/Register/RegisterHero'
import Squares from "@/components/Squares/Squares";
import MultiStepForm from '@/components/Register/MultiStepForm';

export default function Register() {
  return (
    <main>
      <RegisterHero />
      <div className="relative">
        <div className="absolute inset-0 z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#000"
          hoverFillColor="#222"
        />
        </div>
        <div className="relative z-2">
          <MultiStepForm />
        </div>
      </div>
    </main>
  )
}
