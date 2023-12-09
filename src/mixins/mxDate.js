import { format } from 'date-fns';

const mxDate = {
	mxFormatDate(date) {
		return format(date, 'dd/MM/yyyy')
	}
}
  
export default mxDate