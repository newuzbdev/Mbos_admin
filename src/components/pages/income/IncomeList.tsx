import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetIncome, useIncomeUpdate } from "@/hooks/useIncome";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Income } from "@/types/income";
import { Plus, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IncomeCard = ({
  title,
  value,
  onEditClick,
}: {
  title: string;
  value: number;
  onEditClick: () => void;
}) => (
  <Card className="cursor-pointer" onClick={onEditClick}>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Plus size={17} className="text-white rounded-md bg-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
    </CardContent>
  </Card>
);

const IncomeList = () => {
  const [fieldToEdit, setFieldToEdit] = useState<{
    field: keyof Income;
    income: Income;
  } | null>(null);
  const [newValue, setNewValue] = useState<number>(0);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [updateAllDialogVisible, setUpdateAllDialogVisible] = useState(false);
  const [currentValues, setCurrentValues] = useState<Partial<Income>>({});

  const { data: incomes = { data: { data: [] } }, refetch, isLoading } = useGetIncome();
  const { mutate: updateIncome, isSuccess: isUpdateSuccess, isError: isUpdateError } = useIncomeUpdate();

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({ variant: "success", title: "Income successfully updated" });
      refetch();
      setEditDialogVisible(false);
      setUpdateAllDialogVisible(false);
    } else if (isUpdateError) {
      toast({ variant: "destructive", title: "Error updating income" });
    }
  }, [isUpdateSuccess, isUpdateError, refetch]);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldToEdit) {
      const currentValue = fieldToEdit.income[fieldToEdit.field];
      const updatedValue = typeof currentValue === 'number' ? currentValue + newValue : newValue;
      updateIncome({ id: fieldToEdit.income.id, [fieldToEdit.field]: updatedValue });
    }
  };

  const handleUpdateAllSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (incomes.data?.data) {
      incomes.data.data.forEach((income: Income) => {
        const updatedIncome: Income = {
          id: income.id,
          translation_benefit: currentValues.translation_benefit ?? income.translation_benefit,
          cash_benefit: currentValues.cash_benefit ?? income.cash_benefit,
          online_benefit: currentValues.online_benefit ?? income.online_benefit,
          benefit: currentValues.benefit ?? income.benefit,
          workers_harm: currentValues.workers_harm ?? income.workers_harm,
          harm: currentValues.harm ?? income.harm,
        };
        updateIncome(updatedIncome);
      });
    }
  };

  const openEditDialog = (field: keyof Income, income: Income) => {
    setFieldToEdit({ field, income });
    setNewValue(0);
    setEditDialogVisible(true);
  };
  const openUpdateAllDialog = () => {
    if (incomes.data?.data) {
      const values = incomes.data.data.reduce((_acc: Partial<Income>, income: Income) => {
        return {
          translation_benefit: income.translation_benefit,
          cash_benefit: income.cash_benefit,
          online_benefit: income.online_benefit,
          benefit: income.benefit,
          workers_harm: income.workers_harm,
          harm: income.harm,
        };
      }, {} as Partial<Income>);
      setCurrentValues(values);
    }
    setUpdateAllDialogVisible(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {incomes.data?.data.map((income: Income) => (
          <React.Fragment key={income.id}>
            <IncomeCard
              title="O'tkazmalardan tushim"
              value={income.translation_benefit}
              onEditClick={() => openEditDialog("translation_benefit", income)}
            />
            <IncomeCard
              title="Naqt pul"
              value={income.cash_benefit}
              onEditClick={() => openEditDialog("cash_benefit", income)}
            />
            <IncomeCard
              title="Online pul"
              value={income.online_benefit}
              onEditClick={() => openEditDialog("online_benefit", income)}
            />
            <IncomeCard
              title="Qo'shimcha foyda"
              value={income.benefit}
              onEditClick={() => openEditDialog("benefit", income)}
            />
            <IncomeCard
              title="Ishchilarga maosh"
              value={income.workers_harm}
              onEditClick={() => openEditDialog("workers_harm", income)}
            />
            <IncomeCard
              title="Qo'shimcha chiqim"
              value={income.harm}
              onEditClick={() => openEditDialog("harm", income)}
            />
          </React.Fragment>
        ))}
      </div>

      <Button onClick={openUpdateAllDialog} className="mt-4" variant="outline">
        <Edit size={16} className="mr-2" /> Update All
      </Button>

      {/* Edit Individual Income Dialog */}
      <Dialog open={editDialogVisible} onOpenChange={setEditDialogVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Income</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <Label htmlFor="newValue">New Value</Label>
            <Input
              id="newValue"
              value={newValue.toLocaleString()}
              onChange={(e) => setNewValue(Number(e.target.value.replace(/\D/g, '')))}
              type="text"
              required
            />
            <DialogFooter className="p-4">
              <Button type="submit" className="text-white">Save</Button>
              <Button variant="secondary" onClick={() => setEditDialogVisible(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={updateAllDialogVisible} onOpenChange={setUpdateAllDialogVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update All Income</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateAllSubmit}>
            <div className="space-y-4">
              <Label htmlFor="translation_benefit">Translation Benefit</Label>
              <Input
                id="translation_benefit"
                value={currentValues.translation_benefit?.toLocaleString() ?? ""}
                onChange={(e) => setCurrentValues({ ...currentValues, translation_benefit: Number(e.target.value.replace(/\D/g, '')) })}
                type="text"
                required
              />
              <Label htmlFor="cash_benefit">Cash Benefit</Label>
              <Input
                id="cash_benefit"
                value={currentValues.cash_benefit?.toLocaleString() ?? ""}
                onChange={(e) => setCurrentValues({ ...currentValues, cash_benefit: Number(e.target.value.replace(/\D/g, '')) })}
                type="text"
                required
              />
              <Label htmlFor="online_benefit">Online Benefit</Label>
              <Input
                id="online_benefit"
                value={currentValues.online_benefit?.toLocaleString() ?? ""}
                onChange={(e) => setCurrentValues({ ...currentValues, online_benefit: Number(e.target.value.replace(/\D/g, '')) })}
                type="text"
                required
              />
              <Label htmlFor="benefit">Additional Benefit</Label>
              <Input
                id="benefit"
                value={currentValues.benefit?.toLocaleString() ?? ""}
                onChange={(e) => setCurrentValues({ ...currentValues, benefit: Number(e.target.value.replace(/\D/g, '')) })}
                type="text"
                required
              />
              <Label htmlFor="workers_harm">Workers Harm</Label>
              <Input
                id="workers_harm"
                value={currentValues.workers_harm?.toLocaleString() ?? ""}
                onChange={(e) => setCurrentValues({ ...currentValues, workers_harm: Number(e.target.value.replace(/\D/g, '')) })}
                type="text"
                required
              />
              <Label htmlFor="harm">Additional Harm</Label>
              <Input
                id="harm"
                value={currentValues.harm?.toLocaleString() ?? ""}
                onChange={(e) => setCurrentValues({ ...currentValues, harm: Number(e.target.value.replace(/\D/g, '')) })}
                type="text"
                required
              />
            </div>
            <DialogFooter className="p-4">
              <Button type="submit" className="text-white">Update All</Button>
              <Button variant="secondary" onClick={() => setUpdateAllDialogVisible(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeList;