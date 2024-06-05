import Header from '@components/all/Header';
import Footer from '@components/all/Footer';
import SelectPlaceRegionFilter from '@components/SelectPlace/SelectPlaceRegionFilter';
import SelectPlaceSigunguFilter from '@components/SelectPlace/SelectPlaceSigunguFilter';
import SelectPlacePlaceList from '@components/SelectPlace/SelectPlacePlaceList';

export default function SelectPlacePage() {
  return (
    <>
      <Header />
      <SelectPlaceRegionFilter />
      <SelectPlaceSigunguFilter />
      <SelectPlacePlaceList />
      <Footer />
    </>
  );
}
