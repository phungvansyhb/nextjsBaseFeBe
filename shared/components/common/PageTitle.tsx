import { cn } from '@/shared/lib/utils';
import React from 'react';

type Props = {
  title : string ,
  className? : string
}
function PageTitle(props : Props) {
  return (
    <div className={cn(' font-bold text-[24px] lg:text-[32px]',props.className)}>{props.title}</div>
  );
}

export default PageTitle;
