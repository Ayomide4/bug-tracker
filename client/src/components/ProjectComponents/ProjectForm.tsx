
export default function ProjectForm(props:any) {

  const handleChange = (e:any) => {
    const newData:any = {...props.formData}
    newData[e.target.id] = e.target.value
    props.setFormData(newData)
  }
  


  return (
    <form onSubmit={props.handleSubmit} className='bg-white w-full h-full' autoComplete='off'>
      <div className="ml-4">
        <div className="flex flex-col mb-6">
          <label className="mb-1 text-lg">Title</label>
          <input id="title" onChange={(e) => handleChange(e)} value={props.formData.title} maxLength={30} className="rounded-md w-2/3 p-2 border border-gray-500" type='text' placeholder="Enter a title"/>
        </div>
        <div className="flex flex-col mb-6">
          <label className="mb-1 text-lg">Description</label>
          <textarea id="desc" onChange={(e) => handleChange(e)} value={props.formData.desc} maxLength={150} className="border border-gray-500 pl-2 pt-2 h-24 resize-none w-2/3" placeholder="Enter a description"/>
        </div>
        <div className="flex flex-col mb-8">
          <label className="mb-1 text-lg">Team</label>
          <input id="team" onChange={(e) => handleChange(e)} value={props.formData.team} maxLength={30} className="rounded-md w-2/3 p-2 border border-gray-500" type='text' placeholder="Enter your team's name"/>
        </div>
        <button className="w-36 h-12 text-lg bg-[#1D3557] text-white">Create Project</button>
      </div>
    </form>
  )
}
