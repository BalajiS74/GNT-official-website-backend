import { ObjectId } from "mongodb";
import { getCollection } from "../config/db.js";

const toObjectId = (id) => {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
};

/* =========================
   CONTACT MODEL
========================= */
export const saveContact = async ({ name, email, message }) => {
  const collection = getCollection("contacts");
  const result = await collection.insertOne({ name, email, message, createdAt: new Date() });
  return result;
};

export const getContacts = async () => {
  const collection = getCollection("contacts");
  return collection.find().sort({ _id: -1 }).toArray();
};

export const getContactById = async (id) => {
  const collection = getCollection("contacts");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.findOne({ _id: objectId });
};

export const updateContact = async ({ id, name, email, message }) => {
  const collection = getCollection("contacts");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.updateOne(
    { _id: objectId },
    { $set: { name, email, message, updatedAt: new Date() } }
  );
};

export const deleteContact = async (id) => {
  const collection = getCollection("contacts");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.deleteOne({ _id: objectId });
};

/* =========================
   REGISTER MODEL
========================= */
export const saveRegister = async (data) => {
  const { name, email, phone, course, program, message } = data;
  const collection = getCollection("registrations");
  return collection.insertOne({
    name,
    email,
    phone,
    course,
    program,
    message,
    createdAt: new Date(),
  });
};

export const getRegistrations = async () => {
  const collection = getCollection("registrations");
  return collection.find().sort({ _id: -1 }).toArray();
};

export const getRegistrationById = async (id) => {
  const collection = getCollection("registrations");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.findOne({ _id: objectId });
};

export const updateRegistration = async ({ id, name, email, phone, course, program, message }) => {
  const collection = getCollection("registrations");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.updateOne(
    { _id: objectId },
    { $set: { name, email, phone, course, program, message, updatedAt: new Date() } }
  );
};

export const deleteRegistration = async (id) => {
  const collection = getCollection("registrations");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.deleteOne({ _id: objectId });
};

/* =========================
   MEETING MODEL
========================= */
export const saveMeeting = async ({ name, email, phone, date }) => {
  const collection = getCollection("meetings");
  return collection.insertOne({
    name,
    email,
    phone,
    meeting_date: date,
    createdAt: new Date(),
  });
};

export const getMeetings = async () => {
  const collection = getCollection("meetings");
  return collection.find().sort({ _id: -1 }).toArray();
};

export const getMeetingById = async (id) => {
  const collection = getCollection("meetings");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.findOne({ _id: objectId });
};

export const updateMeeting = async ({ id, name, email, phone, date }) => {
  const collection = getCollection("meetings");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.updateOne(
    { _id: objectId },
    { $set: { name, email, phone, meeting_date: date, updatedAt: new Date() } }
  );
};

export const deleteMeeting = async (id) => {
  const collection = getCollection("meetings");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.deleteOne({ _id: objectId });
};

/* =========================
   JOB APPLICATION MODEL
========================= */
export const saveJobApplication = async (data) => {
  const { fullName, email, phone, position, resume, coverLetter } = data;
  const collection = getCollection("job_applications");
  return collection.insertOne({
    full_name: fullName,
    email,
    phone,
    position,
    resume,
    cover_letter: coverLetter,
    createdAt: new Date(),
  });
};

export const getJobApplications = async () => {
  const collection = getCollection("job_applications");
  return collection.find().sort({ _id: -1 }).toArray();
};

export const getJobApplicationById = async (id) => {
  const collection = getCollection("job_applications");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.findOne({ _id: objectId });
};

export const updateJobApplication = async ({ id, fullName, email, phone, position, resume, coverLetter }) => {
  const collection = getCollection("job_applications");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.updateOne(
    { _id: objectId },
    {
      $set: {
        full_name: fullName,
        email,
        phone,
        position,
        resume,
        cover_letter: coverLetter,
        updatedAt: new Date(),
      },
    }
  );
};

export const deleteJobApplication = async (id) => {
  const collection = getCollection("job_applications");
  const objectId = toObjectId(id);
  if (!objectId) return null;
  return collection.deleteOne({ _id: objectId });
};