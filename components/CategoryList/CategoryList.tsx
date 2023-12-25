import Link from 'next/link';
import {
  BiLogoJavascript, BiLogoTypescript, BiLogoHtml5, 
  BiLogoCss3, BiLogoNodejs, BiLogoMongodb, BiLogoReact, BiLogoRedux
} from 'react-icons/bi'
import { SiNextdotjs } from 'react-icons/si'
import s from './style.module.css';

type Props = {
  title: string
};

const ctgs = [
  [<BiLogoJavascript size={30} color={'var(--javascript)'}/>,'JavaScript'], 
  [<BiLogoTypescript size={30} color={'var(--typescript)'}/>,'TypeScript'], 
  [<BiLogoMongodb size={30} color={'var(--mongodb)'}/>, 'MongoDB'],
  [<BiLogoNodejs size={30} color={'var(--nodejs)'}/>, 'Nodejs'], 
  [<BiLogoReact size={30} color={'var(--reactjs)'}/>, 'Reactjs'], 
  [<SiNextdotjs size={25} color={'black'} />, 'Nextjs'],
  [<BiLogoHtml5 size={30} color={'var(--html)'}/>, 'HTML'], 
  [<BiLogoCss3 size={30} color={'var(--css)'}/>, 'CSS'],
  [<BiLogoRedux size={30} color={'var(--redux)'}/>, 'Redux'],
];

function CategoryList({title} : Props) {

  return (
    <div className={`${s.categories} categories wrapper`}>
      <h3>{title}</h3>
      <ul className={s.list}>
        {
          ctgs.map((ctg,i) => (
            <li key={i} className={s.ctg}>
              <Link href={`/posts/category?q=${ctg[1]}`}>
                {ctg[0]}
                <span>{ctg[1]}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default CategoryList