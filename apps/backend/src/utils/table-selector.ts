import { environment } from '@config/environment';

const tableSelector = (table: string) => `${table}-${environment.STAGE}`;

export default tableSelector;
