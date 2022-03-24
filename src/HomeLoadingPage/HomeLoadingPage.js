import HomeTopBar from "../Home/HomeTopBar";

function HomeLoadingPage() {
  return (
    <div>
      <HomeTopBar isLoading={true} />
    </div>
  );
}

export default HomeLoadingPage;
