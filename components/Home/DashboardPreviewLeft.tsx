import WeeklyOverviewPreview from "./WeeklyOverviewPreview";

export default function DashboardPreviewLeft() {
  return (
    <div className="h-fit p-20 flex justify-center items-center">
      <div className="w-full" style={{ perspective: "2000px" }}>
        <div
          className="w-full h-full"
          style={{
            transform:
              "rotateX(10deg) rotateY(-15deg) rotateZ(5deg) scale(1.1)",
            transformStyle: "preserve-3d",
            boxShadow: "-30px 30px 60px var(--shadow)",
          }}
        >
          <div>
            <div className="container mx-auto p-4 flex flex-col items-center ">
              <div className="w-full flex flex-col gap-4">
                <WeeklyOverviewPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
