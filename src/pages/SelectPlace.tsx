import Header from '@components/all/Header';
import RegionFilter from '@components/SelectPlace/RegionFilterComponent';
import PlaceFilter from '@components/SelectPlace/PlaceFilter';
import PlaceList from '@components/SelectPlace/PlaceList';

export default function SelectPlacePage() {
  return (
    <>
      <Header />
      <RegionFilter />
      <PlaceFilter />
      <PlaceList />
    </>
  );
}
