import { Search } from 'lucide-react'

function SearchBar() {
  return (
    <div className='w-full flex justify-center items-center gap-2 text-sm font-semibold bg-zinc-200 border-2 border-zinc-400 px-2 py-1.5 rounded-full cursor-pointer hover:bg-zinc-300'>
        <Search size={18} />
        <p>Search</p>
        <div className="flex gap-1 ml-1">
            <span className='bg-zinc-400 px-2 py-1 text-xs rounded text-zinc-100 '>Ctrl</span>
            <span className='bg-zinc-400 px-2 py-1 text-xs rounded text-zinc-100 '>K</span>
        </div>
    </div>
    // <div className='w-full flex justify-center items-center gap-2 text-sm font-semibold bg-zinc-200 border-2 border-zinc-400 px-2 py-1.5 rounded-full cursor-pointer hover:bg-zinc-300'>
    //     <Search size={18} />
    //     <p>Search</p>
    //     <div className="flex gap-1 ml-1">
    //         <span className='bg-zinc-400 px-2 py-1 text-xs rounded text-zinc-100 '>Ctrl</span>
    //         <span className='bg-zinc-400 px-2 py-1 text-xs rounded text-zinc-100 '>K</span>
    //     </div>
    // </div>
  )
}

export default SearchBar