import TodaysIntakePreview from "./TodaysIntakePreview";
import NavbarPreview from "./NavbarPreview";

export default function DashboardPreview() {
  return (
    <div className="h-fit p-20 flex justify-center items-center">
      <div className="w-full" style={{ perspective: "1500px" }}>
        <div
          className="max-md:w-[125%] w-full h-full"
          style={{
            transform:
              "rotateX(10deg) rotateY(15deg) rotateZ(-5deg) scale(1.1)",
            transformStyle: "preserve-3d",
            boxShadow: "30px 30px 60px var(--shadow)",
          }}
        >
          <div
            style={{
              boxShadow: "inset 30px 30px 60px var(--highlight)",
            }}
            className="rounded-xl"
          >
            <NavbarPreview />

            <div className="container mx-auto p-4 flex flex-col items-center ">
              <div className="w-full flex flex-col gap-4">
                <TodaysIntakePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
