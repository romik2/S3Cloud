import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function CustomBreadcrumbs({breadcrumbs, handleClick}) {
    let breadcrumbsArray = [];
    let breadcrumbsEnd = breadcrumbs.pop();
    breadcrumbs.forEach((breadcrumb, key) => {
        breadcrumbsArray.push(
        <Link underline="hover" key={key} color="inherit" value={breadcrumb} onClick={(e) => handleClick(e)}>
            {breadcrumb}
        </Link>
        );
    });
    breadcrumbsArray.push(
        <Typography key="end" color="text.primary">
            {breadcrumbsEnd}
        </Typography>
    );
  
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