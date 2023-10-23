import { v4 } from 'uuid';
import { statusOpt, typeOpt } from '../helpers/contants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addJob } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newJob = Object.fromEntries(form.entries());

    if (!newJob.type || !newJob.status) {
      toast.info('Tüm alanları doldurun');
      return;
    }

    
    newJob.id = v4();

   
    newJob.date = new Date().toLocaleDateString();

    
    axios
      .post('http://localhost:3040/jobs', newJob)
      .then(() => {
        
        dispatch(addJob(newJob));

        
        navigate('/');

        
        toast.success('İş Başarıyla Eklendi');
      })
      .catch(() => toast.error('Beklenmedik bir hata oluştu..'));
  };

  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pozisyon</label>
          <input required name="position" type="text" />
        </div>

        <div>
          <label>Şirket</label>
          <input required name="company" type="text" />
        </div>

        <div>
          <label>Lokasyon</label>
          <input required name="location" type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select name="status">
            <option selected disabled>
              Seçiniz
            </option>
            {statusOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select name="type">
            <option selected disabled>
              Seçiniz
            </option>
            {typeOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <button>Ekle</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;