import { environment } from '@config/environment';

const tableSelector = (table: string) => `${table}_${environment.STAGE}`;

export default tableSelector;
