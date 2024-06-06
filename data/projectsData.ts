interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Gemcaps',
    description: `Experience personalized, concierge-level service with Gemcaps. Our advanced technology-driven platform streamlines your revenue cycle, maximizing efficiency and optimizing financial outcomes. Enjoy the seamless integration of service and technology with Gemcaps today.`,
    imgSrc: '/static/images/gemcaps.png',
    href: '/projects/the-time-machine',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default projectsData
