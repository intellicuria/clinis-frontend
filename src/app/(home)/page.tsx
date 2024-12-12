
import { getAllDoctor, getAllOrganizations } from "@/lib/actions/BookingApiService";
import SectionLargeSlider from "./SectionLargeSlider";
import Card10V2 from "@/ui/Card10/Card10V2";

async function getData() {
  try {
    const [doctors, organizations] = await Promise.all([
      getAllDoctor(),
      getAllOrganizations()
    ]);
    
    return {
      doctors: doctors?.data || [],
      organizations: organizations?.data || []
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      doctors: [],
      organizations: []
    };
  }
}

export default async function HomePage() {
  const { doctors, organizations } = await getData();
  
  return (
    <div className="nc-PageHome relative">
      <div className="container relative">
        <SectionLargeSlider data={doctors} />
        
        {/* DOCTOR SECTION */}
        <div className="relative py-16">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-semibold">Popular Doctors</h2>
            <a href="/search" className="text-primary-500 hover:text-primary-600">View all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {doctors?.slice(0, 8).map((doctor, index) => (
              <Card10V2 key={index} data={doctor} />
            ))}
          </div>
        </div>

        {/* ORGANIZATION SECTION */}
        <div className="relative py-16">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-semibold">Popular Clinics</h2>
            <a href="/search?type=clinics" className="text-primary-500 hover:text-primary-600">View all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {organizations?.slice(0, 6).map((org, index) => (
              <Card10V2 key={index} data={org} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
