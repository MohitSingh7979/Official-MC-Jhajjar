import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, Gavel, Users, HelpCircle, Loader2 } from 'lucide-react';
import { DataService } from '../services/dataService';
import { ICON_MAP } from '../constants';
import { Department } from '../types';

const DepartmentsSection: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDepts = async () => {
      const data = await DataService.getDepartments();
      setDepartments(data);
      setLoading(false);
    };
    loadDepts();
  }, []);

  const toggleDept = (id: string) => setExpandedDept(prevId => prevId === id ? null : id);

  if (loading) return <div className="py-20 text-center flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-brand-orange" /></div>;

  return (
    <section id="departments" className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center text-brand-orange font-bold tracking-wider uppercase text-sm mb-2">Organizational Structure</div>
          <h2 className="text-3xl font-bold text-brand-blue">Municipal Branches</h2>
          <p className="text-slate-500 mt-2 max-w-2xl mx-auto">Specialized wings to ensure efficient service delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const isExpanded = expandedDept === dept.id;
            const Icon = ICON_MAP[dept.icon] || HelpCircle;

            return (
              <div key={dept.id} className={`bg-white rounded-xl border transition-all duration-300 ${isExpanded ? 'border-brand-orange shadow-xl ring-1 ring-brand-orange/20' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                     <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-brand-blue">
                       <Icon className="w-6 h-6" />
                     </div>
                     <button onClick={() => toggleDept(dept.id)} className="text-slate-400 hover:text-brand-orange focus:outline-none transition-colors">
                       {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                     </button>
                  </div>
                  <h3 className="text-lg font-bold text-brand-blue mb-2 cursor-pointer hover:text-brand-orange transition-colors" onClick={() => toggleDept(dept.id)}>{dept.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{dept.description}</p>
                  
                  <div className="flex items-center text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                     <User className="w-4 h-4 mr-2 text-brand-orange" />
                     <div><span className="block font-bold text-xs text-slate-500 uppercase">Head of Dept</span><span className="font-medium text-brand-blue">{dept.incharge}</span></div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-fade-in-up">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center"><Users className="w-3 h-3 mr-1" /> Staff Members</h4>
                        <ul className="text-sm space-y-1">{dept.employees.map((emp, i) => <li key={i} className="text-slate-600 pl-2 border-l-2 border-slate-200">{emp}</li>)}</ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center"><Gavel className="w-3 h-3 mr-1" /> Key Acts & Rules</h4>
                        <ul className="text-sm space-y-1">{dept.acts.map((act, i) => <li key={i} className="text-slate-600 bg-slate-50 px-2 py-1 rounded text-xs inline-block mr-2 mb-1">{act}</li>)}</ul>
                      </div>
                    </div>
                  )}
                  {!isExpanded && (
                    <button onClick={() => toggleDept(dept.id)} className="w-full mt-4 text-xs font-bold text-center text-brand-orange hover:bg-brand-orange/10 py-2 rounded transition-colors">View Staff & Details</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;