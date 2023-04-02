import { useParams } from "react-router-dom";
import UniversityHeader from "./UniversityHeader";
import UniversityOverview from "./UniversityOverview";
import UniversityPrograms from "./UniversityPrograms";
import ace from "../Images/ace.jpg"
import VerticalNavbar from "./VerticalNavbar";



const UniversityPage = () => {
  const headerData = {
    name: 'Harvard University',
    image: ace,
    location: 'Cambridge, MA',
    ranking: '1st in National Universities',
  };

  const overviewData = {
    description:
      'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, Harvard is the oldest institution of higher learning in the United States and among the most prestigious in the world.',
    website: 'https://www.harvard.edu/',
    location: 'Cambridge, MA',
    type: 'Private university',
    size: '31,566 students',
    tuition: '$59,950',
  };

  const programsData = [
    {
      id: 1,
      name: 'Computer Science',
      image: 'https://via.placeholder.com/100x100',
      description:
        'Computer science is the study of computers, computing, and computation in correspondence with computer systems. This field of study utilizes theories on how computers work to design, test, and analyze concepts.',
      duration: '4 years',
      cost: '$49,653',
      link: 'https://www.harvard.edu/academics/computer-science',
    },
    {
      id: 2,
      name: 'Biology',
      image: 'https://via.placeholder.com/100x100',
      description:
        'Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.',
      duration: '4 years',
      cost: '$49,653',
      link: 'https://www.harvard.edu/academics/biology',
    },
    {
      id: 3,
      name: 'Economics',
      image: 'https://via.placeholder.com/100x100',
      description:
        'Economics is a social science concerned with the production, distribution, and consumption of goods and services. It studies how individuals, businesses, governments, and nations make choices about how to allocate resources.',
      duration: '4 years',
      cost: '$49,653',
      link: 'https://www.harvard.edu/academics/economics',
    },
  ];

  return (
    <div className="flex flex-row">
      <VerticalNavbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UniversityHeader university={headerData} image={ace} />
        <div className="py-12">
          <UniversityOverview university={overviewData} />
          <UniversityPrograms programs={programsData} />
        </div>
      </div>
    </div>
    
  );
};

export default UniversityPage;