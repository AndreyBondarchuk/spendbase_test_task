import {DataApi} from '../../types';

const searchBy = (obj: DataApi, query: string): DataApi | null => {
  if (!query || !obj) {
    return { ...obj };
  }

  if(Object.keys(obj).length === 0) {
    return { ...obj };
  }

  if (obj.children && obj.children.length) {
    const filteredChildren = obj.children
      .map((child: any) => searchBy(child, query))
      .filter((child: any) => child !== null);

      return obj.name?.toLowerCase().includes(query.toLowerCase())
      ? { ...obj }
      :  filteredChildren.length
      ? { ...obj, children: filteredChildren }
      : null;

    
  }

  return obj.name?.toLowerCase().includes(query.toLowerCase())
    ? { ...obj }
    : null;
};


export default searchBy;

