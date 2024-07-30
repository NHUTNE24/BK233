import React from "react";
import { IconButton } from "@mui/material";
import Chip1 from "../../../components/Chips/Chip1";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "antd";
import LimitTags from "./components/LimitTags";
import NewSyllabusModal from "./components/NewSyllabusModal"
import { Link, useParams } from "react-router-dom";
import { Syllabus } from "../../../assets/data/Syllabus";

const totalDays = Syllabus.map(bill => bill.days).reduce((acc, amount) => acc + amount);
const totalHours = Syllabus.map(bill => bill.hours).reduce((acc, amount) => acc + amount);


function ClassUpdatePage2() {
  var classId = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <header className="p-5 flex flex-col gap-2 border-b-2">
        <h4>Training program of Fresher Develop Operation</h4>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <h3>DevOps Foundation</h3>
            <Chip1 text="Inactive" closable={false} inactive={true} />
          </div>
          <IconButton><MoreHorizIcon /></IconButton>
        </div>
      </header>
      <header className="p-5 flex flex-col gap-2 border-b-2">
        <h4>{totalDays}<span className="text-base font-normal"> days ({totalHours} hours)</span></h4>
        <p className="subtitle2 !font-normal">Modified on <span>21/07/2022</span> by <span>Warrior Tran</span></p>
      </header>
      <section className="p-5 flex flex-col gap-3">
        <p className="subtitle1 !font-bold">Content</p>
        {
          Syllabus.map((item, index) => (
            <div key={index} className={`flex flex-row items-center rounded-3xl overflow-hidden elevation2 ${(item.status == "Active" ? `!text-main` : `!text-[#B9B9B9]`)}`}>
              <img src='https://via.placeholder.com/300x100' alt='placeholder' />
              <div className="flex grow justify-between items-start">
                <div className='p-5 flex flex-col gap-3'>
                  <div className='flex flex-row gap-3 items-center'>
                    <h4>{item.name}</h4>
                    <Chip1 text={item.status} closable={false} inactive={(item.status != 'Active') ? true : false} />
                  </div>
                  <div className='flex flex-row gap-3 items-center'>
                    <p className='subtitle2 !font-normal'>{item.code + ' ' + item.version}</p>
                    <div className='h-5 w-0.5 bg-primary'></div>
                    <p className='subtitle2 !font-normal'>{item.days} days <span className='italic'>({item.hours} hours)</span></p>
                    <div className='h-5 w-0.5 bg-primary'></div>
                    <p className='subtitle2 !font-normal'>on <span>{item.modified_on}</span> by <span>{item.modified_by}</span></p>
                  </div>
                </div>
                <div className="mr-1 mt-1">
                  <IconButton><HighlightOffIcon /></IconButton>
                </div>
              </div>
            </div>
          ))
        }
      </section >
      <section className="p-5 flex flex-row items-center gap-5">
        <Button onClick={handleOpen} className="bg-main text-primary btn-text-md rounded-xl" icon={<AddRoundedIcon />}>
          Add syllabus
        </Button>
        <NewSyllabusModal open={open} handleClose={handleClose} />
        <p>or</p>
        <LimitTags />
      </section>
      <section className='p-5 flex flex-row justify-between'>
        <Link to={`/class/update/${classId}/step1`}>
          <Button className='border-2 border-main text-main rounded-xl' icon={<ArrowBackIcon />}>
            Back
          </Button>
        </Link>
        <div className='flex flex-row gap-2'>
          <Button className='bg-alert text-primary rounded-xl'>
            Cancel
          </Button>
          <Button className='bg-main text-primary rounded-xl'>
            Save
          </Button>
        </div>
      </section>
    </div >
  );
}

export default ClassUpdatePage2;