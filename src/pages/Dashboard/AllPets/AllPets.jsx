import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";
import usePet from "../../../hooks/usePet";
import useallpet from "../../../hooks/useallpet";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
  
  const AllPets = () => {

    const axiosSecure = useAxiosSecure();
    const [allpetdata, refetch] = useallpet();

    const handleDelete = (item) =>{
      console.log(item);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) { 
        axiosSecure.delete(`/petlist/${item}`)
        .then(res => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

        }
      });

    }
    const handleAdopt = (item) =>{

      axiosSecure.patch(`/petlist/${item}`)
      .then(res => {
        refetch()
        console.log(res.data);
        if(res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Pet Adopted",
            icon: "success"
          });
        }
      })
    }

  

    
    const [sorting, setSorting] = useState([])
    
    const columnHelper = createColumnHelper();


  
    const columns = [

      columnHelper.accessor("", {

        
        id: "S.No",
        cell: (info) => <span >{info.row.index + 1}</span>,
        header: "S.No",
  
      }),
      columnHelper.accessor("petName", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "petName",
      }),
      columnHelper.accessor("petCategory", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "pet Category",
      }),
      columnHelper.accessor("image", {
        cell: (info) => (
          <img
            src={info?.getValue()}
            alt="..."
            className="rounded-md w-14 object-cover"
          />
        ),
        header: "Pet Image",
      }),
      columnHelper.accessor("adopted", {
        cell: (props) => {
            return `${props.getValue() == true ? 'adopted' : "not adopted"  }`
        },
        header: "adopted status",
      }),
      columnHelper.accessor("_id", {
        cell: (props) => {
          return <><div className="flex gap-3 md:flex-row flex-col "><Link className=" bg-green-500 hover:bg-green-600 rounded-lg px-3 py-3 " to={`/dashboard/update-pet/${props.getValue()}`}>Update</Link> <button className="bg-red-500 px-3 py-3 rounded-md hover:bg-red-600" onClick={()=> handleDelete(props.getValue())}>Delete</button> <button className="bg-blue-500 px-3 py-3 rounded-md hover:bg-blue-600" onClick={()=> handleAdopt(props.getValue())}>Adopt</button> </div></>
      },
        header: "Action",
      }),
    ];
    const [data] = useState(allpetdata);
  
    const table = useReactTable({

      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel:getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state:{
          sorting: sorting,
      },
      onSortingChange: setSorting,
      getPaginationRowModel: getPaginationRowModel(),
    });
    refetch()
    return (

        <>
        <Helmet>

        </Helmet>



      <div className="flex flex-col overflow-x-auto">
  <div className="sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:text-white dark:border-neutral-500">
          {table.getHeaderGroups().map(headerGroup => (
                    <tr className='border' key={headerGroup?.id}>
                        {headerGroup.headers.map(header => 
                        <th className="capitalize px-6 py-3 " scope="col" key={header?._id} onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}

                            {
                                {asc: '⬆️', desc: '⬇️'} [header.column.getIsSorted() ?? null]
                            }
                        </th>
                        )}
                    </tr>
                ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row._id}
                  className={`
                  ${i % 2 === 0 ? "bg-gray-900 text-white dark:bg-gray-800  dark:border-gray-700" : "bg-gray-800 text-white dark:bg-gray-800 dark:border-gray-700"}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell._id} className="px-3.5 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
            <div className="flex gap-4 my-3">
            <button className="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none" onClick={()=> table.setPageIndex(0)}>First Page</button>
            <button className="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none disabled:opacity-50" disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()} >Previous Page</button>
            <button className="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none disabled:opacity-50" disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()}>Next Page</button>
            <button className="px-8 py-3 text-white bg-blue-600 rounded focus:outline-none" onClick={()=> table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      </>
    );
  };
  
  export default AllPets;