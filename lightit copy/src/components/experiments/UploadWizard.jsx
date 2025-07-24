import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepProgress from '../ui/StepProgress';
import FloatingInput from '../ui/FloatingInput';
import AnimatedButton from '../ui/AnimatedButton';

const steps = [
  "Experiment Details",
  "Media Content",
  "Procedure",
  "Safety & Results",
  "Review"
];

export default function UploadWizard({ onSubmit, isSubmitting }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    grade: '',
    subject: '',
    description: '',
    video: '',
    images: [],
    materials: [''],
    procedure: '',
    precautions: '',
    results: '',
    discussion: ''
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleChange = (name, value) => {
    setFormData(fd => ({ ...fd, [name]: value }));
    setErrors(errs => ({ ...errs, [name]: undefined }));
  };

  const validate = () => {
    const v = {};
    if (currentStep === 0) {
      ['title','grade','subject','description'].forEach(f => {
        if (!formData[f]?.trim()) v[f] = 'Required';
      });
    }
    if (currentStep === 2 && !formData.procedure.trim()) v.procedure = 'Required';
    if (currentStep === 3) {
      ['precautions','results','discussion'].forEach(f => {
        if (!formData[f].trim()) v[f] = 'Required';
      });
    }
    setErrors(v);
    return !Object.keys(v).length;
  };

  const next = () => {
    if (!validate()) return;
    setCurrentStep(s => Math.min(s+1, steps.length-1));
  };
  const back = () => setCurrentStep(s => Math.max(s-1,0));

  const addMaterial = () =>
    setFormData(fd => ({ ...fd, materials: [...fd.materials, ''] }));
  const changeMat = (i, val) =>
    setFormData(fd => {
      const m = [...fd.materials]; m[i]=val;
      return { ...fd, materials: m };
    });
  const removeMat = i =>
    setFormData(fd => {
      const m = fd.materials.filter((_,j)=> j!==i);
      return { ...fd, materials: m.length? m:[''] };
    });

  const onFiles = files => {
    const imgs = Array.from(files).filter(f=>f.type.startsWith('image/'));
    if (imgs.length) setFormData(fd=>({ ...fd, images:[...fd.images,...imgs] }));
  };

  // drag & drop handlers
  const onDragOver = e => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop = e => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  };
  const trigger = () => fileInputRef.current.click();

  return (
    <div className="space-y-6">
      <StepProgress steps={steps} currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x:100, opacity:0 }}
          animate={{ x:0, opacity:1 }}
          exit={{ x:-100, opacity:0 }}
          transition={{ duration:0.3 }}
          className="pt-4"
        >
          {currentStep===0 && (
            <div className="space-y-4">
              {[
                ['title','Experiment Title *'],
                ['grade','Grade Level *'],
                ['subject','Subject *'],
                ['description','Description *']
              ].map(([f,label])=>(
                <FloatingInput
                  key={f}
                  label={label}
                  name={f}
                  type={f==='description'?'textarea': f==='grade'||f==='subject'?'select':'text'}
                  options={f==='grade'?['7','8','9','10','11','12']:f==='subject'?['Physics','Chemistry','Biology']:undefined}
                  value={formData[f]}
                  onChange={(n,v)=>handleChange(n,v)}
                  error={errors[f]}
                  required
                  rows={f==='description'?3:undefined}
                />
              ))}
            </div>
          )}
          {currentStep===1 && (
            <div className="space-y-4">
              <FloatingInput
                label="Video URL (YouTube)"
                name="video"
                value={formData.video}
                onChange={(n,v)=>handleChange(n,v)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experiment Images</label>
                <div
                  onClick={trigger}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={`cursor-pointer border-2 border-dashed rounded-xl w-full min-h-48 flex flex-col items-center justify-center ${
                    dragging?'border-blue-500 bg-blue-50':'border-gray-300 bg-gray-100'
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={e=>onFiles(e.target.files)}
                  />
                  <p className="text-gray-600">
                    <span className="font-medium text-blue-600">Click or drag</span> to add images
                  </p>
                </div>
                {formData.images.length>0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.images.map((img,i)=>(
                      <div key={i} className="relative group w-16 h-16">
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          className="object-cover w-full h-full rounded"
                        />
                        <button
                          onClick={()=>setFormData(fd=>{
                            const arr=[...fd.images]; arr.splice(i,1);
                            return {...fd,images:arr};
                          })}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 opacity-0 group-hover:opacity-100"
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {currentStep===2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Materials Used</label>
                <div className="space-y-2">
                  {formData.materials.map((m,i)=>(
                    <div key={i} className="flex">
                      <input
                        type="text"
                        value={m}
                        placeholder={`Material ${i+1}`}
                        onChange={e=>changeMat(i,e.target.value)}
                        className="flex-1 border rounded-l px-4 py-2"
                      />
                      <button
                        onClick={()=>removeMat(i)}
                        disabled={formData.materials.length<=1}
                        className="bg-red-500 text-white px-3 rounded-r"
                      >×</button>
                    </div>
                  ))}
                  <AnimatedButton type="button" onClick={addMaterial}>+ Add Material</AnimatedButton>
                </div>
              </div>
              <FloatingInput
                label="Procedure *"
                name="procedure"
                type="textarea"
                rows={6}
                value={formData.procedure}
                onChange={(n,v)=>handleChange(n,v)}
                error={errors.procedure}
                required
                placeholder="Enter each step on a new line"
              />
            </div>
          )}
          {currentStep===3 && (
            <div className="space-y-4">
              {['precautions','results','discussion'].map(f=>(
                <FloatingInput
                  key={f}
                  label={`${f.charAt(0).toUpperCase()+f.slice(1)} *`}
                  name={f}
                  type="textarea"
                  rows={4}
                  value={formData[f]}
                  onChange={(n,v)=>handleChange(n,v)}
                  error={errors[f]}
                  required
                />
              ))}
            </div>
          )}
          {currentStep===4 && (
            <div className="bg-white p-6 rounded-xl shadow-inner space-y-4">
              <h3 className="text-xl font-bold">Review Your Experiment</h3>
              {Object.entries(formData).map(([k,v])=>{
                if (k==='images'||k==='materials') return null;
                return (
                  <div key={k}>
                    <h4 className="font-semibold text-gray-600">{k.charAt(0).toUpperCase()+k.slice(1)}</h4>
                    <p className="whitespace-pre-wrap">{v|| <span className="text-red-400">Not provided</span>}</p>
                  </div>
                );
              })}
              {formData.images.length>0 && (
                <div>
                  <h4 className="font-semibold">Images</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.images.map((_,i)=>(
                      <img key={i} src={URL.createObjectURL(formData.images[i])} className="w-16 h-16 rounded"/>
                    ))}
                  </div>
                </div>
              )}
              {formData.materials.some(m=>m.trim()) && (
                <div>
                  <h4 className="font-semibold">Materials</h4>
                  <ul className="list-disc pl-5">
                    {formData.materials.filter(m=>m.trim()).map((m,i)=><li key={i}>{m}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-6">
        <AnimatedButton onClick={back} disabled={currentStep===0||isSubmitting}>
          Previous
        </AnimatedButton>

        {currentStep===steps.length-1 ? (
          <AnimatedButton
            onClick={()=>onSubmit(formData)}
            loading={isSubmitting}
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-400"
          >
            Submit
          </AnimatedButton>
        ) : (
          <AnimatedButton onClick={next} disabled={isSubmitting}>
            Next
          </AnimatedButton>
        )}
      </div>
    </div>
);
}
