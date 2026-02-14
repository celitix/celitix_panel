// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import { IoClose } from "react-icons/io5";

// export default function DoctorProfileDialog({ open, onClose, doctor }) {
//   if (!doctor) return null;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       {/* ================= HEADER ================= */}
//       <DialogTitle className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <Avatar src={doctor.image} sx={{ width: 56, height: 56 }} />
//           <div>
//             <h2 className="font-semibold">{doctor.displayName}</h2>
//             <p className="text-sm text-gray-500 capitalize">
//               {doctor.department} · {doctor.specialist}
//             </p>
//           </div>
//         </div>

//         <IconButton onClick={onClose}>
//           <IoClose />
//         </IconButton>
//       </DialogTitle>

//       <Divider />

//       {/* ================= CONTENT ================= */}
//       <DialogContent className="space-y-6">
//         {/* BASIC INFO */}
//         <section>
//           <h3 className="font-semibold mb-2">Basic Information</h3>
//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <p><strong>ID:</strong> {doctor.id}</p>
//             <p><strong>Username:</strong> {doctor.username}</p>
//             <p><strong>Gender:</strong> {doctor.gender}</p>
//             <p><strong>DOB:</strong> {doctor.dob}</p>
//             <p><strong>Phone:</strong> {doctor.phone}</p>
//             <p><strong>Email:</strong> {doctor.email}</p>
//             <p><strong>Fees:</strong> ₹{doctor.fees}</p>
//             <p><strong>Registration No:</strong> {doctor.registrationNo}</p>
//           </div>
//         </section>

//         <Divider />

//         {/* ADDRESS */}
//         <section>
//           <h3 className="font-semibold mb-2">Address</h3>
//           <p className="text-sm">
//             {doctor.address}, {doctor.city}, {doctor.state},{" "}
//             {doctor.country} - {doctor.pinCode}
//           </p>
//         </section>

//         <Divider />

//         {/* LANGUAGES */}
//         <section>
//           <h3 className="font-semibold mb-2">Languages</h3>
//           <div className="flex gap-2 flex-wrap">
//             {doctor.languages?.map((lang, i) => (
//               <span
//                 key={i}
//                 className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
//               >
//                 {lang}
//               </span>
//             ))}
//           </div>
//         </section>

//         <Divider />

//         {/* EDUCATION */}
//         <section>
//           <h3 className="font-semibold mb-2">Education</h3>
//           <ul className="space-y-2 text-sm">
//             {doctor.education?.map((edu, i) => (
//               <li key={i}>
//                 <strong>{edu.qualification}</strong> – {edu.institute} (
//                 {new Date(edu.year).getFullYear()})
//               </li>
//             ))}
//           </ul>
//         </section>

//         <Divider />

//         {/* EXPERIENCE */}
//         <section>
//           <h3 className="font-semibold mb-2">Experience</h3>
//           <ul className="space-y-2 text-sm">
//             {doctor.experience?.map((exp, i) => (
//               <li key={i}>
//                 <strong>{exp.role}</strong> – {exp.hospital} (
//                 {new Date(exp.from).getFullYear()} →{" "}
//                 {exp.to ? new Date(exp.to).getFullYear() : "Present"})
//               </li>
//             ))}
//           </ul>
//         </section>

//         <Divider />

//         {/* MEMBERSHIP */}
//         {doctor.membership?.length > 0 && (
//           <>
//             <section>
//               <h3 className="font-semibold mb-2">Memberships</h3>
//               <ul className="space-y-2 text-sm">
//                 {doctor.membership.map((m, i) => (
//                   <li key={i}>
//                     <strong>{m.organization}</strong> – {m.description} (
//                     {new Date(m.year).getFullYear()})
//                   </li>
//                 ))}
//               </ul>
//             </section>
//             <Divider />
//           </>
//         )}

//         {/* AWARDS */}
//         {doctor.awards?.length > 0 && (
//           <section>
//             <h3 className="font-semibold mb-2">Awards</h3>
//             <ul className="space-y-2 text-sm">
//               {doctor.awards.map((a, i) => (
//                 <li key={i}>
//                   <strong>{a.title}</strong> – {a.description} (
//                   {new Date(a.year).getFullYear()})
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {/* SOCIAL MEDIA */}
//         <section>
//           <h3 className="font-semibold mb-2">Social Media</h3>
//           <div className="flex gap-4 text-sm">
//             {doctor.socialMedia?.facebook && (
//               <a
//                 href={doctor.socialMedia.facebook}
//                 target="_blank"
//                 className="text-blue-600"
//               >
//                 Facebook
//               </a>
//             )}
//             {doctor.socialMedia?.twitter && (
//               <a
//                 href={doctor.socialMedia.twitter}
//                 target="_blank"
//                 className="text-blue-600"
//               >
//                 Twitter
//               </a>
//             )}
//             {doctor.socialMedia?.linkedin && (
//               <a
//                 href={doctor.socialMedia.linkedin}
//                 target="_blank"
//                 className="text-blue-600"
//               >
//                 LinkedIn
//               </a>
//             )}
//           </div>
//         </section>
//       </DialogContent>
//     </Dialog>
//   );
// }

// prime react version
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

export default function DoctorProfileDialog({ open, onClose, doctor }) {
  if (!doctor) return null;

  return (
    <Dialog
      header={
        <div className="flex flex-col md:flex-row items-center gap-3">
          <Avatar image={doctor.image} size="xlarge" shape="circle" />
          <div className="flex flex-col text-center md:text-start" >
            <h3 className="m-0">{doctor.displayName}</h3>
            <small className="text-gray-500 capitalize">
              {doctor.department} · {doctor.specialist}
            </small>
          </div>
        </div>
      }
      visible={open}
      style={{ width: "80vw" }}
      onHide={onClose}
      draggable={false}
      resizable={false}
    >
      <div className="space-y-4 text-sm">
        {/* ================= BASIC INFO ================= */}
        <section>
          <h4 className=" text-base font-semibold mb-2">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>
              <strong>ID:</strong> {doctor.id}
            </p>
            <p>
              <strong>Username:</strong> {doctor.username}
            </p>
            <p>
              <strong>Gender:</strong> {doctor.gender}
            </p>
            <p>
              <strong>DOB:</strong> {doctor.dob}
            </p>
            <p>
              <strong>Phone:</strong> {doctor.phone}
            </p>
            <p  >
              <strong>Email:</strong> {doctor.email}
            </p>
            <p>
              <strong>Fees:</strong> ₹{doctor.fees}
            </p>
            <p>
              <strong>Registration No:</strong> {doctor.registrationNo}
            </p>
          </div>
        </section>

        <Divider />

        {/* ================= ADDRESS ================= */}
        <section>
          <h4 className="text-base font-semibold mb-2">Address</h4>
          <p>
            {doctor.address}, {doctor.city}, {doctor.state}, {doctor.country} -{" "}
            {doctor.pinCode}
          </p>
        </section>

        <Divider />

        {/* ================= LANGUAGES ================= */}
        <section>
          <h4 className="text-base font-semibold mb-2">Languages</h4>
          <div className="flex gap-2 flex-wrap">
            {doctor.languages?.map((lang, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* ================= EDUCATION ================= */}
        <section>
          <h4 className="text-base font-semibold mb-2">Education</h4>
          <ul className="space-y-1">
            {doctor.education?.map((edu, i) => (
              <li key={i}>
                <strong>{edu.qualification}</strong> – {edu.institute} (
                {new Date(edu.year).getFullYear()})
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* ================= EXPERIENCE ================= */}
        <section>
          <h4 className="text-base font-semibold mb-2">Experience</h4>
          <ul className="space-y-1">
            {doctor.experience?.map((exp, i) => (
              <li key={i}>
                <strong>{exp.role}</strong> – {exp.hospital} (
                {new Date(exp.from).getFullYear()} →{" "}
                {exp.to ? new Date(exp.to).getFullYear() : "Present"})
              </li>
            ))}
          </ul>
        </section>

        {/* ================= MEMBERSHIP ================= */}
        {doctor.membership?.length > 0 && (
          <>
            <Divider />
            <section>
              <h4 className="text-base font-semibold mb-2">Memberships</h4>
              <ul className="space-y-1">
                {doctor.membership.map((m, i) => (
                  <li key={i}>
                    <strong>{m.organization}</strong> – {m.description} (
                    {new Date(m.year).getFullYear()})
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* ================= AWARDS ================= */}
        {doctor.awards?.length > 0 && (
          <>
            <Divider />
            <section>
              <h4 className="text-base font-semibold mb-2">Awards</h4>
              <ul className="space-y-1">
                {doctor.awards.map((a, i) => (
                  <li key={i}>
                    <strong>{a.title}</strong> – {a.description} (
                    {new Date(a.year).getFullYear()})
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* ================= SOCIAL ================= */}
        <Divider />
        <section>
          <h4 className="text-base font-semibold mb-2">Social Media</h4>
          <div className="flex gap-4">
            {doctor.socialMedia?.facebook && (
              <a
                href={doctor.socialMedia.facebook}
                target="_blank"
                className="text-blue-600"
              >
                Facebook
              </a>
            )}
            {doctor.socialMedia?.twitter && (
              <a
                href={doctor.socialMedia.twitter}
                target="_blank"
                className="text-blue-600"
              >
                Twitter
              </a>
            )}
            {doctor.socialMedia?.linkedin && (
              <a
                href={doctor.socialMedia.linkedin}
                target="_blank"
                className="text-blue-600"
              >
                LinkedIn
              </a>
            )}
          </div>
        </section>
      </div>
    </Dialog>
  );
}
