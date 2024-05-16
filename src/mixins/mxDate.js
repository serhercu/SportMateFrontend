import { format } from 'date-fns';

export const mxDate = {
	methods: {
		mxFormatDate(date) {
			return format(date, 'dd/MM/yyyy')
		},
		mxFormatHour(time) {
			const parts = time.split(":");
			return parts[0] + ":" + parts[1];
		}
	}
}