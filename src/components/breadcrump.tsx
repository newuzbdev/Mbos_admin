// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
//   } from "@/components/ui/breadcrumb"
//   <Breadcrumb>
//   <BreadcrumbList>
//     <BreadcrumbItem>
//       <BreadcrumbLink href="/">Home</BreadcrumbLink>
//     </BreadcrumbItem>
//     <BreadcrumbSeparator />
//     <BreadcrumbItem>
//       <BreadcrumbLink href="/components">Components</BreadcrumbLink>
//     </BreadcrumbItem>
//     <BreadcrumbSeparator />
//     <BreadcrumbItem>
//       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
//     </BreadcrumbItem>
//   </BreadcrumbList>
// </Breadcrumb>
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // Adjust import based on your folder structure"
import { useLocation } from "react-router-dom";

const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = pathnames.map((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join("/")}`;
    return { label: value.charAt(0).toUpperCase() + value.slice(1), path };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
