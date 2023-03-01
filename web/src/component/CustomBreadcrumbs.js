import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function CustomBreadcrumbs({breadcrumbs, handleClick}) {
    let breadcrumbsArray = [];
    let breadcrumbsStart = breadcrumbs.shift();
    let breadcrumbsEnd = breadcrumbs.pop();

    if (breadcrumbsEnd) {
      breadcrumbsArray.push(
        <Link underline="hover" key="home" color="inherit" value="" onClick={handleClick}>
            {breadcrumbsStart}
        </Link>
      );
    } else {
      breadcrumbsArray.push(
        <Typography key="end" color="text.primary">
            {breadcrumbsStart}
        </Typography>
      );
    }

    breadcrumbs.forEach((breadcrumb, key) => {
      breadcrumbsArray.push(
        <Link underline="hover" key={key} color="inherit" value={breadcrumb} onClick={handleClick}>
            {breadcrumb}
        </Link>
      );
    });

    if (breadcrumbsEnd) {
      breadcrumbsArray.push(
        <Typography key="end" color="text.primary">
            {breadcrumbsEnd}
        </Typography>
      );
    }

    return (
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbsArray}
        </Breadcrumbs>
      </Stack>
    );
  }