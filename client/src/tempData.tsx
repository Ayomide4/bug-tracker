type ticketObjArr = {
  //'Title', 'Submitted By', 'Severity', 'Status', 'Priority', 'Last Updated'
  title: string,
  submittedBy: string,
  status: string,
  priority: string,
  lastUpdated: string
}

type greetObject = {
  title: string,
  desc: string,
  manager: string,
  team: string,
  lastUpdated: string,
  status: string
}



export const data01: {name: string, value:number}[] = [
  { name: 'High', value: 6 },
  { name: 'Medium', value: 10 },
  { name: 'Low', value: 20 },
];

export const projectList: string[] = [
  'Project 1',
  'Project 2',
  'Project 3',
  'Project 4',
  'Project 5',
]

export const ticketList: string[] = [
  'Ticket 1',
  'Ticket 2',
  'Ticket 3',
  'Ticket 4',
  'Ticket 5',
]

export const tickets: ticketObjArr[] = [
  {title: 'Ticket 1', submittedBy: 'Ayo', status:'Development', priority:'High', lastUpdated: '12/9/22'},
  {title: 'Ticket 2', submittedBy: 'Tye', status:'New', priority:'Medium', lastUpdated: '1/12/22'},
  {title: 'Ticket 3', submittedBy: 'James', status:'Unassigned', priority:'Low', lastUpdated: '1/31/22'},
  {title: 'Ticket 4', submittedBy: 'Rachel', status:'Development', priority:'High', lastUpdated: '4/5/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
  {title: 'Ticket 5', submittedBy: 'Sike', status:'New', priority:'Medium', lastUpdated: '3/4/22'},
]


export const projects: greetObject[] = [
  {title: 'Project 1', desc: 'First Project wow!', manager: 'manager 1', team: 'TechSquad', lastUpdated: '12/8/22', status: 'inactive'}]