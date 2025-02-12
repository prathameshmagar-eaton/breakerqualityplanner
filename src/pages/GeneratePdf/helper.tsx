import { colors } from '@material-ui/core';
import moment from 'moment';

export const getDateFormat = (date: string | Date | null): string => {
    if (date === '' || date === null) return '';
    return moment(date).format('MM/DD/YYYY');
};

export const pdfConfig = {
    headerTextSize: 18,
    labelTextSize: 10,
    fieldTextSize: 9,
    lineHeight: 4,
    subLineHeight: 4,
    primary: colors.blue[500],
    blackBold: colors.grey[900],
    textBlack: '#000000',
    lightBlue: colors.blue[50],
    grey: colors.grey[500],
    logoHeight: 40,
    logoWidth: 40,
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    // margin:useTheme().spacing(2)
};

// export const exportTableStructure = () => {

// }