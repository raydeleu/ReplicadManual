Replicad uses the OpenCascade 3D modelling CAD (computer aided design) kernel. This is the same kernel that is used in the FreeCad application. In many respects therefore the output of CascadeStudio is comparable to FreeCad. Note however that Replicad uses a port of the OpenCascade kernel to javascript, called opencascadejs (see https://github.com/donalffons/opencascade.js). The functions in this library are explained at https://ocjs.org/. There are Replicad functions that are close to the opencascade kernel but also more user friendly functions that shield the user from the complexity of this library. 

The OpenCascade kernel was developed originally by a set of people that started as part of Matra Datavision. Their first CAD system called Euclid was already developed in 1980. This software has evolved an in the passing years the company changed hands several times, first to Areva, then EADS and since 2014 it is part of Capgemini.

The name Cascade is derived from CAS.CADE (Computer Aided Software for Computer Aided Design and Engineering). In 1999 Matra Datavision published CAS.CADE in open source on the Internet as Open CASCADE later renamed to Open CASCADE Technology.

https://www.opencascade.com/

It is interesting to note that the number of 3D kernels used worlwide is rather limited. The most well-known kernels are:

* ACIS by Spatial
* ShapeManager by Autodesk, which is in fact a fork from ACIS
* CGM (Convergence Geometric Modeller) also by Spatial and used in the famous CATIA software.
* Parasolid by Siemens
* C3D Toolkit by C3D Labs
* Open CASCADE

There are also kernels used for socalled Nurbs modelling, used by software packages such as Rhino and Moi3D (Moment of Inspiration). These kernels also use the BRep approach where the surfaces are described by socalled Non-Uniform Rational B-Splines (NURBS). The advantage of NURBS is that these are capable to describe both complex shapes and simple geometric shapes like lines and arcs.

Sometimes it is argued that a proper 3D kernel has infinite accuracy as the shapes are defined by mathematical equations that are continuous. While this seems a reasonable assumption, we should also consider how the 3D shape is used. During the creation of the part the person constructing the part uses a visualisation of the part on the computer screen. To produce this visualisation, the computer has to calculate the position of points and edges. This is not done with infinite accuracy. In CascadeStudio there is a slider that determines the "mesh-resolution". The default setting is 0.10 and provides a smooth image. If we increase the mesh-resolution, the mesh-resolution becomes in fact more coarse and circles show straight segments. 

After the design the part is often exported to a 3D printer or CNC machine in a socalled STL (stereolithography) model. In the STL format the shape is again represented by small faces. The granularity or resolution of these faces can often be indicated during the export. The smaller the resolution, the longer an export will take and the larger the resulting file will be. If the resolution of the produced file is visible in the end-product is determined both by the resolution of the data used to control the machine that is producing the part (or the mold for a part) and by the manufacturing process. For example, if a CNC (computer numerical control) mill is used to produce a part, the inner radii are often determined by the diameter of the tool that is used to mill the product. The radius will be very smooth as it is produced by a revolving tool (the socalled end-mill). 

If you want to know more on manufacturing techniques, many resources can be found on the internet. At https://www.making.unsw.edu.au/learn/ there are some short tutorials on different manufacturing techniques to produce your own part. 
